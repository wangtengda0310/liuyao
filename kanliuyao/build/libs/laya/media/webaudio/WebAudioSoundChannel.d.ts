import { SoundChannel } from "../SoundChannel";
/**
 * @private
 * web audio api方式播放声音的音轨控制
 */
export declare class WebAudioSoundChannel extends SoundChannel {
    /**
     * 声音原始文件数据
     */
    audioBuffer: any;
    /**
     * gain节点
     */
    private gain;
    /**
     * 播放用的数据
     */
    private bufferSource;
    /**
     * 当前时间
     */
    private _currentTime;
    /**
     * 当前音量
     */
    private _volume;
    /**
     * 播放开始时的时间戳
     */
    private _startTime;
    private _pauseTime;
    /**
     * 播放设备
     */
    private context;
    private _onPlayEnd;
    private static _tryCleanFailed;
    static SetTargetDelay: number;
    constructor();
    /**
     * 播放声音
     * @override
     */
    play(): void;
    private __onPlayEnd;
    /**
     * 获取当前播放位置
     * @override
     */
    readonly position: number;
    /**
     * @override
     */
    readonly duration: number;
    private _clearBufferSource;
    private _tryClearBuffer;
    /**
     * 停止播放
     * @override
     */
    stop(): void;
    /**
     * @override
     */
    pause(): void;
    /**
     * @override
     */
    resume(): void;
    /**
     * 设置音量
     * @override
     */
    /**
    * 获取音量
    * @override
    */
    volume: number;
}
