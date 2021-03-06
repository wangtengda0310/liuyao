import { Shader3D } from "../../../d3/shader/Shader3D";
export class ShuriKenParticle3DShaderDeclaration {
}
//Base
ShuriKenParticle3DShaderDeclaration.WORLDPOSITION = Shader3D.propertyNameToID("u_WorldPosition");
ShuriKenParticle3DShaderDeclaration.WORLDROTATION = Shader3D.propertyNameToID("u_WorldRotation");
ShuriKenParticle3DShaderDeclaration.POSITIONSCALE = Shader3D.propertyNameToID("u_PositionScale");
ShuriKenParticle3DShaderDeclaration.SIZESCALE = Shader3D.propertyNameToID("u_SizeScale");
ShuriKenParticle3DShaderDeclaration.SCALINGMODE = Shader3D.propertyNameToID("u_ScalingMode");
ShuriKenParticle3DShaderDeclaration.GRAVITY = Shader3D.propertyNameToID("u_Gravity");
ShuriKenParticle3DShaderDeclaration.THREEDSTARTROTATION = Shader3D.propertyNameToID("u_ThreeDStartRotation");
ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDLENGTHSCALE = Shader3D.propertyNameToID("u_StretchedBillboardLengthScale");
ShuriKenParticle3DShaderDeclaration.STRETCHEDBILLBOARDSPEEDSCALE = Shader3D.propertyNameToID("u_StretchedBillboardSpeedScale");
ShuriKenParticle3DShaderDeclaration.SIMULATIONSPACE = Shader3D.propertyNameToID("u_SimulationSpace");
ShuriKenParticle3DShaderDeclaration.CURRENTTIME = Shader3D.propertyNameToID("u_CurrentTime");
//VelocityOverLifetime
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYCONST = Shader3D.propertyNameToID("u_VOLVelocityConst");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTX = Shader3D.propertyNameToID("u_VOLVelocityGradientX");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTY = Shader3D.propertyNameToID("u_VOLVelocityGradientY");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTZ = Shader3D.propertyNameToID("u_VOLVelocityGradientZ");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYCONSTMAX = Shader3D.propertyNameToID("u_VOLVelocityConstMax");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTXMAX = Shader3D.propertyNameToID("u_VOLVelocityGradientMaxX");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTYMAX = Shader3D.propertyNameToID("u_VOLVelocityGradientMaxY");
ShuriKenParticle3DShaderDeclaration.VOLVELOCITYGRADIENTZMAX = Shader3D.propertyNameToID("u_VOLVelocityGradientMaxZ");
ShuriKenParticle3DShaderDeclaration.VOLSPACETYPE = Shader3D.propertyNameToID("u_VOLSpaceType");
//ColorOverLifetime
ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTALPHAS = Shader3D.propertyNameToID("u_ColorOverLifeGradientAlphas");
ShuriKenParticle3DShaderDeclaration.COLOROVERLIFEGRADIENTCOLORS = Shader3D.propertyNameToID("u_ColorOverLifeGradientColors");
ShuriKenParticle3DShaderDeclaration.MAXCOLOROVERLIFEGRADIENTALPHAS = Shader3D.propertyNameToID("u_MaxColorOverLifeGradientAlphas");
ShuriKenParticle3DShaderDeclaration.MAXCOLOROVERLIFEGRADIENTCOLORS = Shader3D.propertyNameToID("u_MaxColorOverLifeGradientColors");
//SizeOverLifetime
ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENT = Shader3D.propertyNameToID("u_SOLSizeGradient");
ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTX = Shader3D.propertyNameToID("u_SOLSizeGradientX");
ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTY = Shader3D.propertyNameToID("u_SOLSizeGradientY");
ShuriKenParticle3DShaderDeclaration.SOLSizeGradientZ = Shader3D.propertyNameToID("u_SOLSizeGradientZ");
ShuriKenParticle3DShaderDeclaration.SOLSizeGradientMax = Shader3D.propertyNameToID("u_SOLSizeGradientMax");
ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTXMAX = Shader3D.propertyNameToID("u_SOLSizeGradientMaxX");
ShuriKenParticle3DShaderDeclaration.SOLSIZEGRADIENTYMAX = Shader3D.propertyNameToID("u_SOLSizeGradientMaxY");
ShuriKenParticle3DShaderDeclaration.SOLSizeGradientZMAX = Shader3D.propertyNameToID("u_SOLSizeGradientMaxZ");
//RotationOverLifetime
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONST = Shader3D.propertyNameToID("u_ROLAngularVelocityConst");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTSEPRARATE = Shader3D.propertyNameToID("u_ROLAngularVelocityConstSeprarate");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENT = Shader3D.propertyNameToID("u_ROLAngularVelocityGradient");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientX");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTY = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientY");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTZ = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientZ");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityConstMax");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYCONSTMAXSEPRARATE = Shader3D.propertyNameToID("u_ROLAngularVelocityConstMaxSeprarate");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientMax");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTXMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientMaxX");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTYMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientMaxY");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTZMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientMaxZ");
ShuriKenParticle3DShaderDeclaration.ROLANGULARVELOCITYGRADIENTWMAX = Shader3D.propertyNameToID("u_ROLAngularVelocityGradientMaxW");
//TextureSheetAnimation
ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONCYCLES = Shader3D.propertyNameToID("u_TSACycles");
ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONSUBUVLENGTH = Shader3D.propertyNameToID("u_TSASubUVLength");
ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONGRADIENTUVS = Shader3D.propertyNameToID("u_TSAGradientUVs");
ShuriKenParticle3DShaderDeclaration.TEXTURESHEETANIMATIONGRADIENTMAXUVS = Shader3D.propertyNameToID("u_TSAMaxGradientUVs");
