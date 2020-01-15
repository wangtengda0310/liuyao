import { Config3D } from "../../../../Config3D";
import { Vector2 } from "../../math/Vector2";
import { Vector3 } from "../../math/Vector3";
import { Utils3D } from "../../utils/Utils3D";
/**
 * @internal
 */
class LightBound {
}
/**
 * @internal
 */
class ClusterData {
    constructor() {
        this.updateMark = -1;
        this.pointLightCount = 0;
        this.spotLightCount = 0;
        this.indices = [];
    }
}
/**
 * @internal
 */
export class Cluster {
    constructor(xSlices, ySlices, zSlices, maxLightsPerClusterAverage) {
        this._updateMark = 0;
        this._depthSliceParam = new Vector2();
        this._xSlices = xSlices;
        this._ySlices = ySlices;
        this._zSlices = zSlices;
        var clusterTexWidth = xSlices * ySlices;
        var clisterTexHeight = zSlices * (1 + Math.ceil(maxLightsPerClusterAverage / 4));
        this._clusterTexture = Utils3D._createFloatTextureBuffer(clusterTexWidth, clisterTexHeight);
        this._clusterTexture.lock = true;
        this._clusterPixels = new Float32Array(clusterTexWidth * clisterTexHeight * 4);
        //Init for every cluster
        var clusterDatas = new Array(this._zSlices);
        for (var z = 0; z < this._zSlices; z++) {
            clusterDatas[z] = new Array(this._ySlices);
            for (var y = 0; y < this._ySlices; y++) {
                clusterDatas[z][y] = new Array(this._xSlices);
                for (var x = 0; x < this._xSlices; x++)
                    clusterDatas[z][y][x] = new ClusterData();
            }
        }
        this._clusterDatas = clusterDatas;
        /*
        Layout of clusterTexture
        |------------------------------------------------------U(XY)
        |               cluster0               cluster1
        |        (PCou|SCou|Off0|Off1) | (PCou|SCou|Off0|Off1)
        |               cluster2               cluster3
        |        (PCou|SCou|Off0|Off1) | (PCou|SCou|Off0|Off1)
        |-----------------------------------------------------------
        |                                    _
        |        (poi0|poi1|spo0|spo1) |(spo2|poi0|poi1|poi2)
        |             _
        |        (poi3|spo0|....|....) |(....|....|....|....)
        |
        V(Z)
        */
    }
    _insertSpotLightSphere(origin, forward, size, angle, testSphere) {
        //combine cone cull and sphere range cull
        var V = Cluster._tempVector35;
        V.x = testSphere.x - origin.x;
        V.y = testSphere.y - origin.y;
        V.z = testSphere.z - origin.z;
        var VlenSq = Vector3.dot(V, V);
        var sphereRadius = testSphere.w;
        var rangeCull = VlenSq > sphereRadius * sphereRadius;
        if (!rangeCull)
            return false;
        var V1len = Vector3.dot(V, forward);
        var distanceClosestPoint = Math.cos(angle) * Math.sqrt(VlenSq - V1len * V1len) - V1len * Math.sin(angle);
        var angleCull = distanceClosestPoint > sphereRadius;
        var frontCull = V1len > sphereRadius + size;
        var backCull = V1len < -sphereRadius;
        return !(angleCull || frontCull || backCull);
    }
    _placePointLightToClusters(lightIndex, lightBound) {
        var clusterDatas = this._clusterDatas;
        var updateMark = this._updateMark;
        for (var z = lightBound.zMin, zEnd = lightBound.zMax; z < zEnd; z++) {
            for (var y = lightBound.yMin, yEnd = lightBound.yMax; y < yEnd; y++) {
                for (var x = lightBound.xMin, xEnd = lightBound.xMax; x < xEnd; x++) {
                    var data = clusterDatas[z][y][x];
                    if (data.updateMark != updateMark) {
                        data.pointLightCount = 0;
                        data.spotLightCount = 0;
                        data.updateMark = updateMark;
                    }
                    var indices = data.indices;
                    var lightCount = data.pointLightCount++;
                    if (lightCount < indices.length)
                        indices[lightCount] = lightIndex;
                    else
                        indices.push(lightIndex);
                }
            }
        }
    }
    _placeSpotLightToClusters(lightIndex, lightBound) {
        var clusterDatas = this._clusterDatas;
        var updateMark = this._updateMark;
        for (var z = lightBound.zMin, zEnd = lightBound.zMax; z < zEnd; z++) {
            for (var y = lightBound.yMin, yEnd = lightBound.yMax; y < yEnd; y++) {
                for (var x = lightBound.xMin, xEnd = lightBound.xMax; x < xEnd; x++) {
                    var data = clusterDatas[z][y][x];
                    if (data.updateMark != updateMark) {
                        data.pointLightCount = 0;
                        data.spotLightCount = 0;
                        data.updateMark = updateMark;
                    }
                    var indices = data.indices;
                    var lightCount = data.pointLightCount + data.spotLightCount++;
                    if (lightCount < indices.length)
                        indices[lightCount] = lightIndex;
                    else
                        indices.push(lightIndex);
                }
            }
        }
    }
    _insertConePlane(origin, forward, radius, halfAngle, pNor) {
        //https://bartwronski.com/2017/04/13/cull-that-cone/
        //because distance is always zero so we ease this method
        var V1 = Cluster._tempVector36;
        var V2 = Cluster._tempVector37;
        Vector3.cross(pNor, forward, V1);
        Vector3.cross(V1, forward, V2);
        Vector3.normalize(V2, V2);
        var tanR = radius * Math.tan(halfAngle);
        var capRimX = origin.x + radius * forward.x + tanR * V2.x;
        var capRimY = origin.y + radius * forward.y + tanR * V2.y;
        var capRimZ = origin.z + radius * forward.z + tanR * V2.z;
        return capRimX * pNor.x + capRimY * pNor.y + capRimZ * pNor.z <= 0 || origin.x * pNor.x + origin.y * pNor.y + origin.z * pNor.z <= 0;
    }
    _shrinkSphereLightZPerspective(near, far, lightviewPos, radius, lightBound) {
        var lvZ = lightviewPos.z;
        var minZ = lvZ - radius;
        var maxZ = lvZ + radius;
        if ((minZ > far) || (maxZ <= near))
            return false;
        // slice = Math.log2(z) * (numSlices / Math.log2(far / near)) - Math.log2(near) * numSlices / Math.log2(far / near)
        // slice start from near plane,near is index:0,z must large than near,or the result will NaN
        var depthSliceParam = this._depthSliceParam;
        lightBound.zMin = Math.floor(Math.log2(Math.max(minZ, near)) * depthSliceParam.x - depthSliceParam.y);
        lightBound.zMax = Math.min(Math.ceil(Math.log2(maxZ) * depthSliceParam.x - depthSliceParam.y), this._zSlices);
        return true;
    }
    _shrinkSpotLightZPerspective(near, far, viewLightPos, viewConeCap, radius, halfAngle, lightBound) {
        //https://bartwronski.com/2017/04/13/cull-that-cone/
        //http://www.iquilezles.org/www/articles/diskbbox/diskbbox.htm
        var pbX = viewConeCap.x, pbY = viewConeCap.y, pbZ = viewConeCap.z;
        var rb = Math.tan(halfAngle) * radius;
        var paX = viewLightPos.x, paY = viewLightPos.y, paZ = viewLightPos.z;
        var aX = pbX - paX, aY = pbY - paY, aZ = pbZ - paZ;
        var dotA = aX * aX + aY * aY + aZ * aZ;
        var eZ = Math.sqrt(1.0 - aZ * aZ / dotA);
        //flat-capped cone is not spotLight shape,spoltlight is sphere-capped.so we get the common boundBox of flat-capped cone bounds and sphere bounds.
        var minZ = Math.max(Math.min(paZ, pbZ - eZ * rb), viewLightPos.z - radius);
        var maxZ = Math.min(Math.max(paZ, pbZ + eZ * rb), viewLightPos.z + radius);
        if ((minZ > far) || (maxZ <= near))
            return false;
        // slice = Math.log2(z) * (numSlices / Math.log2(far / near)) - Math.log2(near) * numSlices / Math.log2(far / near)
        // slice start from near plane,near is index:0,z must large than near,or the result will NaN
        var depthSliceParam = this._depthSliceParam;
        lightBound.zMin = Math.floor(Math.log2(Math.max(minZ, near)) * depthSliceParam.x - depthSliceParam.y);
        lightBound.zMax = Math.min(Math.ceil(Math.log2(maxZ) * depthSliceParam.x - depthSliceParam.y), this._zSlices);
        return true;
    }
    _shrinkSphereLightByBoundOrth(halfX, halfY, near, far, lightviewPos, radius, lightBound) {
        var lvZ = lightviewPos.z;
        var minZ = lvZ - radius, maxZ = lvZ + radius;
        if ((minZ > far) || (maxZ <= near))
            return false;
        var lvX = lightviewPos.x;
        var minX = lvX - radius, maxX = lvX + radius;
        if ((minX > halfX) || (maxX <= -halfX))
            return false;
        var lvY = lightviewPos.y;
        var minY = lvY - radius, maxY = lvY + radius;
        if ((minY > halfY) || (maxY <= -halfY))
            return false;
        // slice = Math.log2(z) * (numSlices / Math.log2(far / near)) - Math.log2(near) * numSlices / Math.log2(far / near)
        // slice start from near plane,near is index:0,z must large than near,or the result will NaN
        var xSlices = this._xSlices, ySlices = this._ySlices;
        var depthSliceParam = this._depthSliceParam;
        var xStride = halfX * 2 / xSlices, yStride = halfY * 2 / ySlices;
        lightBound.xMin = Math.max(Math.floor((minX + halfX) / xStride), 0);
        lightBound.xMax = Math.min(Math.ceil((maxX + halfX) / xStride), xSlices);
        lightBound.yMin = Math.max(Math.floor((halfY - maxY) / yStride), 0); //zero is from top
        lightBound.yMax = Math.min(Math.ceil((halfY - minY) / yStride), ySlices);
        lightBound.zMin = Math.floor(Math.log2(Math.max(minZ, near)) * depthSliceParam.x - depthSliceParam.y);
        lightBound.zMax = Math.min(Math.ceil(Math.log2(maxZ) * depthSliceParam.x - depthSliceParam.y), this._zSlices);
        return true;
    }
    _shrinkSpotLightByBoundOrth(halfX, halfY, near, far, viewLightPos, viewConeCap, radius, halfAngle, lightBound) {
        //https://bartwronski.com/2017/04/13/cull-that-cone/
        //http://www.iquilezles.org/www/articles/diskbbox/diskbbox.htm
        var pbX = viewConeCap.x, pbY = viewConeCap.y, pbZ = viewConeCap.z;
        var rb = Math.tan(halfAngle) * radius;
        var paX = viewLightPos.x, paY = viewLightPos.y, paZ = viewLightPos.z;
        var aX = pbX - paX, aY = pbY - paY, aZ = pbZ - paZ;
        var dotA = aX * aX + aY * aY + aZ * aZ;
        //flat-capped cone is not spotLight shape,spoltlight is sphere-capped.so we get the common boundBox of flat-capped cone bounds and sphere bounds.
        var eZ = Math.sqrt(1.0 - aZ * aZ / dotA);
        var minZ = Math.max(Math.min(paZ, pbZ - eZ * rb), viewLightPos.z - radius);
        var maxZ = Math.min(Math.max(paZ, pbZ + eZ * rb), viewLightPos.z + radius);
        if ((minZ > far) || (maxZ <= near))
            return false;
        var eX = Math.sqrt(1.0 - aX * aX / dotA);
        var minX = Math.max(Math.min(paX, pbX - eX * rb), viewLightPos.x - radius);
        var maxX = Math.min(Math.max(paX, pbX + eX * rb), viewLightPos.x + radius);
        if ((minX > halfX) || (maxX <= -halfX))
            return false;
        var eY = Math.sqrt(1.0 - aY * aY / dotA);
        var minY = Math.max(Math.min(paY, pbY - eY * rb), viewLightPos.y - radius);
        var maxY = Math.min(Math.max(paY, pbY + eY * rb), viewLightPos.y + radius);
        if ((minY > halfY) || (maxY <= -halfY))
            return false;
        // slice = Math.log2(z) * (numSlices / Math.log2(far / near)) - Math.log2(near) * numSlices / Math.log2(far / near)
        // slice start from near plane,near is index:0,z must large than near,or the result will NaN
        var xSlices = this._xSlices, ySlices = this._ySlices;
        var depthSliceParam = this._depthSliceParam;
        var xStride = halfX * 2 / xSlices, yStride = halfY * 2 / ySlices;
        lightBound.xMin = Math.max(Math.floor((minX + halfX) / xStride), 0);
        lightBound.xMax = Math.min(Math.ceil((maxX + halfX) / xStride), xSlices);
        lightBound.yMin = Math.max(Math.floor((halfY - maxY) / yStride), 0); //zero is from top
        lightBound.yMax = Math.min(Math.ceil((halfY - minY) / yStride), ySlices);
        lightBound.zMin = Math.floor(Math.log2(Math.max(minZ, near)) * depthSliceParam.x - depthSliceParam.y);
        lightBound.zMax = Math.min(Math.ceil(Math.log2(maxZ) * depthSliceParam.x - depthSliceParam.y), this._zSlices);
        return true;
    }
    _shrinkXYByRadiusPerspective(lightviewPos, radius, lightBound, xPlanes, yPlanes) {
        var xMin, yMin;
        var xMax, yMax;
        var lvX = lightviewPos.x, lvY = lightviewPos.y, lvZ = lightviewPos.z;
        var i;
        var n = this._ySlices + 1;
        for (i = 0; i < n; i++) {
            var plane = yPlanes[i];
            if (lvY * plane.y + lvZ * plane.z < radius) { //Dot
                yMin = Math.max(0, i - 1);
                break;
            }
        }
        if (i == n) //fail scan insert
            return false;
        yMax = this._ySlices;
        for (i = yMin + 1; i < n; i++) {
            var plane = yPlanes[i];
            if (lvY * plane.y + lvZ * plane.z <= -radius) { //Dot
                yMax = Math.max(0, i);
                break;
            }
        }
        n = this._xSlices + 1;
        for (i = 0; i < n; i++) {
            var plane = xPlanes[i];
            if (lvX * plane.x + lvZ * plane.z < radius) { //Dot
                xMin = Math.max(0, i - 1);
                break;
            }
        }
        xMax = this._xSlices;
        for (i = xMin + 1; i < n; i++) {
            var plane = xPlanes[i];
            if (lvX * plane.x + lvZ * plane.z <= -radius) { //Dot
                xMax = Math.max(0, i);
                break;
            }
        }
        lightBound.xMin = xMin;
        lightBound.xMax = xMax;
        lightBound.yMin = yMin;
        lightBound.yMax = yMax;
        return true;
    }
    _shrinkSpotXYByConePerspective(lightviewPos, viewForward, radius, halfAngle, lightBound, xPlanes, yPlanes) {
        var xMin, yMin;
        var xMax, yMax;
        var normal = Cluster._tempVector32;
        var n = lightBound.yMax + 1;
        for (var i = lightBound.yMin + 1; i < n; i++) {
            if (this._insertConePlane(lightviewPos, viewForward, radius, halfAngle, yPlanes[i])) {
                yMin = Math.max(0, i - 1);
                break;
            }
        }
        yMax = lightBound.yMax;
        for (var i = yMin + 1; i < n; i++) {
            var plane = yPlanes[i];
            normal.setValue(0, -plane.y, -plane.z);
            if (!this._insertConePlane(lightviewPos, viewForward, radius, halfAngle, normal)) {
                yMax = Math.max(0, i);
                break;
            }
        }
        n = lightBound.xMax + 1;
        for (var i = lightBound.xMin + 1; i < n; i++) {
            if (this._insertConePlane(lightviewPos, viewForward, radius, halfAngle, xPlanes[i])) {
                xMin = Math.max(0, i - 1);
                break;
            }
        }
        xMax = lightBound.xMax;
        for (var i = xMin + 1; i < n; i++) {
            var plane = xPlanes[i];
            normal.setValue(-plane.x, 0, -plane.z);
            if (!this._insertConePlane(lightviewPos, viewForward, radius, halfAngle, normal)) {
                xMax = Math.max(0, i);
                break;
            }
        }
        lightBound.xMin = xMin;
        lightBound.xMax = xMax;
        lightBound.yMin = yMin;
        lightBound.yMax = yMax;
    }
    _updatePointLightPerspective(near, far, viewMat, pointLight, lightIndex, xPlanes, yPlanes) {
        var lightBound = Cluster._tempLightBound;
        var lightviewPos = Cluster._tempVector30;
        Vector3.transformV3ToV3(pointLight._transform.position, viewMat, lightviewPos); //World to View
        lightviewPos.z *= -1;
        if (!this._shrinkSphereLightZPerspective(near, far, lightviewPos, pointLight.range, lightBound))
            return;
        if (!this._shrinkXYByRadiusPerspective(lightviewPos, pointLight.range, lightBound, xPlanes, yPlanes))
            return;
        this._placePointLightToClusters(lightIndex, lightBound);
    }
    _updateSpotLightPerspective(near, far, viewMat, spotLight, lightIndex, xPlanes, yPlanes) {
        // technically could fall outside the bounds we make because the planes themeselves are tilted by some angle
        // the effect is exaggerated the steeper the angle the plane makes is
        var lightBound = Cluster._tempLightBound;
        var viewPos = Cluster._tempVector30;
        var forward = Cluster._tempVector31;
        var viewConeCap = Cluster._tempVector34;
        var position = spotLight._transform.position;
        var range = spotLight.range;
        spotLight._transform.worldMatrix.getForward(forward);
        Vector3.normalize(forward, forward);
        Vector3.scale(forward, range, viewConeCap);
        Vector3.add(position, viewConeCap, viewConeCap);
        Vector3.transformV3ToV3(position, viewMat, viewPos); //World to View
        Vector3.transformV3ToV3(viewConeCap, viewMat, viewConeCap); //World to View
        viewPos.z *= -1;
        viewConeCap.z *= -1;
        var halfAngle = (spotLight.spotAngle / 2) * Math.PI / 180;
        if (!this._shrinkSpotLightZPerspective(near, far, viewPos, viewConeCap, range, halfAngle, lightBound))
            return;
        if (!this._shrinkXYByRadiusPerspective(viewPos, range, lightBound, xPlanes, yPlanes))
            return;
        var viewFor = Cluster._tempVector33;
        viewFor.x = viewConeCap.x - viewPos.x, viewFor.y = viewConeCap.y - viewPos.y, viewFor.z = viewConeCap.z - viewPos.z;
        Vector3.normalize(viewFor, viewFor);
        this._shrinkSpotXYByConePerspective(viewPos, viewFor, range, halfAngle, lightBound, xPlanes, yPlanes);
        this._placeSpotLightToClusters(lightIndex, lightBound);
    }
    _updatePointLightOrth(halfX, halfY, near, far, viewMat, pointLight, lightIndex) {
        var lightBound = Cluster._tempLightBound;
        var lightviewPos = Cluster._tempVector30;
        Vector3.transformV3ToV3(pointLight._transform.position, viewMat, lightviewPos); //World to View
        lightviewPos.z *= -1;
        if (!this._shrinkSphereLightByBoundOrth(halfX, halfY, near, far, lightviewPos, pointLight.range, lightBound))
            return;
        this._placePointLightToClusters(lightIndex, lightBound);
    }
    _updateSpotLightOrth(halfX, halfY, near, far, viewMat, spotLight, lightIndex) {
        // technically could fall outside the bounds we make because the planes themeselves are tilted by some angle
        // the effect is exaggerated the steeper the angle the plane makes is
        var lightBound = Cluster._tempLightBound;
        var viewPos = Cluster._tempVector30;
        var forward = Cluster._tempVector31;
        var viewConeCap = Cluster._tempVector34;
        var position = spotLight._transform.position;
        var range = spotLight.range;
        spotLight._transform.worldMatrix.getForward(forward);
        Vector3.normalize(forward, forward);
        Vector3.scale(forward, range, viewConeCap);
        Vector3.add(position, viewConeCap, viewConeCap);
        Vector3.transformV3ToV3(position, viewMat, viewPos); //World to View
        Vector3.transformV3ToV3(viewConeCap, viewMat, viewConeCap); //World to View
        viewPos.z *= -1;
        viewConeCap.z *= -1;
        var halfAngle = (spotLight.spotAngle / 2) * Math.PI / 180;
        if (!this._shrinkSpotLightByBoundOrth(halfX, halfY, near, far, viewPos, viewConeCap, range, halfAngle, lightBound))
            return;
        this._placeSpotLightToClusters(lightIndex, lightBound);
    }
    update(camera, scene) {
        this._updateMark++;
        var camNear = camera.nearPlane;
        this._depthSliceParam.x = Config3D._config.lightClusterCount.z / Math.log2(camera.farPlane / camNear);
        this._depthSliceParam.y = Math.log2(camNear) * this._depthSliceParam.x;
        var near = camera.nearPlane;
        var far = camera.farPlane;
        var viewMat = camera.viewMatrix;
        var curCount = scene._directionLights._length;
        var pointLights = scene._pointLights;
        var poiCount = pointLights._length;
        var poiElements = pointLights._elements;
        var spotLights = scene._spotLights;
        var spoCount = spotLights._length;
        var spoElements = spotLights._elements;
        if (camera.orthographic) {
            var halfY = camera.orthographicVerticalSize / 2.0;
            var halfX = halfY * camera.aspectRatio;
            for (var i = 0; i < poiCount; i++, curCount++)
                this._updatePointLightOrth(halfX, halfY, near, far, viewMat, poiElements[i], curCount);
            for (var i = 0; i < spoCount; i++, curCount++)
                this._updateSpotLightOrth(halfX, halfY, near, far, viewMat, spoElements[i], curCount);
        }
        else {
            camera._updateClusterPlaneXY();
            var xPlanes = camera._clusterXPlanes; //must after camera._updateClusterPlaneXY()
            var yPlanes = camera._clusterYPlanes;
            for (var i = 0; i < poiCount; i++, curCount++)
                this._updatePointLightPerspective(near, far, viewMat, poiElements[i], curCount, xPlanes, yPlanes);
            for (var i = 0; i < spoCount; i++, curCount++)
                this._updateSpotLightPerspective(near, far, viewMat, spoElements[i], curCount, xPlanes, yPlanes);
        }
        if (poiCount + spoCount > 0) {
            var xSlices = this._xSlices, ySlices = this._ySlices, zSlices = this._zSlices;
            var widthFloat = xSlices * ySlices * 4;
            var lightOff = widthFloat * zSlices;
            var clusterPixels = this._clusterPixels;
            var clusterPixelsCount = clusterPixels.length;
            var clusterDatas = this._clusterDatas;
            var updateMark = this._updateMark;
            var freeSpace = true;
            for (var z = 0; z < zSlices; z++) {
                for (var y = 0; y < ySlices; y++) {
                    for (var x = 0; x < xSlices; x++) {
                        var data = clusterDatas[z][y][x];
                        var clusterOff = (x + y * xSlices + z * xSlices * ySlices) * 4;
                        if (data.updateMark !== updateMark) {
                            clusterPixels[clusterOff] = 0;
                            clusterPixels[clusterOff + 1] = 0;
                        }
                        else {
                            if (freeSpace) {
                                var indices = data.indices;
                                var pCount = data.pointLightCount;
                                var sCount = data.spotLightCount;
                                var count = pCount + sCount;
                                if (lightOff + count < clusterPixelsCount) {
                                    clusterPixels[clusterOff] = pCount;
                                    clusterPixels[clusterOff + 1] = sCount;
                                    clusterPixels[clusterOff + 2] = Math.floor(lightOff / widthFloat); //solve precision problme, if data is big some GPU int(float) have problem
                                    clusterPixels[clusterOff + 3] = lightOff % widthFloat;
                                    for (var i = 0; i < count; i++)
                                        clusterPixels[lightOff++] = indices[i];
                                }
                                else {
                                    count = clusterPixelsCount - (lightOff + count);
                                    pCount = Math.min(pCount, count);
                                    clusterPixels[clusterOff] = pCount;
                                    clusterPixels[clusterOff + 1] = Math.min(sCount, count - pCount);
                                    clusterPixels[clusterOff + 2] = Math.floor(lightOff / widthFloat); //solve precision problme, if data is big some GPU int(float) have problem
                                    clusterPixels[clusterOff + 3] = lightOff % widthFloat;
                                    for (var i = 0; i < count; i++)
                                        clusterPixels[lightOff++] = indices[i];
                                    freeSpace = false; //remain cluster light will be ignore
                                }
                            }
                        }
                    }
                }
            }
            var width = this._clusterTexture.width;
            this._clusterTexture.setSubPixels(0, 0, width, Math.ceil(lightOff / (4 * width)), clusterPixels);
        }
    }
}
Cluster._tempVector30 = new Vector3();
Cluster._tempVector31 = new Vector3();
Cluster._tempVector32 = new Vector3();
Cluster._tempVector33 = new Vector3();
Cluster._tempVector34 = new Vector3();
Cluster._tempVector35 = new Vector3();
Cluster._tempVector36 = new Vector3();
Cluster._tempVector37 = new Vector3();
Cluster._tempLightBound = new LightBound();
