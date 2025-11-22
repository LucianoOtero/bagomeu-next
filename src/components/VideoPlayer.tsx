"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from "react-icons/fa";

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls | null = null;

        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // Auto-play is handled by the video attribute, but we can try here too
                video.play().catch(() => {
                    // Autoplay might be blocked
                    setIsPlaying(false);
                });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("HLS Network Error", data);
                            hls?.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("HLS Media Error", data);
                            hls?.recoverMediaError();
                            break;
                        default:
                            console.error("HLS Fatal Error", data);
                            setError("Erro ao carregar o vídeo.");
                            hls?.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Native HLS support (Safari)
            video.src = src;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch(() => setIsPlaying(false));
            });
        } else {
            setError("Seu navegador não suporta este formato de vídeo.");
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group">
            {error ? (
                <div className="flex items-center justify-center h-full text-white">
                    <p>{error}</p>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        poster={poster}
                        muted={isMuted}
                        playsInline
                        autoPlay
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onClick={togglePlay}
                    />

                    {/* Custom Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-[var(--accent-gold)] transition-colors p-2"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="text-white hover:text-[var(--accent-gold)] transition-colors p-2"
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                        </button>

                        <div className="flex-grow" />

                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-[var(--accent-gold)] transition-colors p-2"
                            aria-label="Fullscreen"
                        >
                            <FaExpand size={20} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
