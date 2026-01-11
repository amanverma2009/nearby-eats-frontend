"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ArrowRightIcon,
  CircleDollarSign,
  MapPin,
  MessageCircle,
  Star,
  Heart,
  Bookmark,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CardInner(
  { onLike, onSave, onDislike, draggable = true, restaurant },
  ref
) {
  const cardRef = useRef(null);
  const pointerIdRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [action, setAction] = useState(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    return () => {
      pointerIdRef.current = null;
    };
  }, []);

  const handlersRef = useRef({});
  const posRef = useRef(pos);
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  function settle(actionType) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (actionType === "like") {
      setPos((p) => ({ x: w * 1.1, y: p.y }));
      setAction("like");
      setTimeout(() => {
        onLike?.();
        setGone(true);
      }, 300);
    } else if (actionType === "dislike") {
      setPos((p) => ({ x: -w * 1.1, y: p.y }));
      setAction("dislike");
      setTimeout(() => {
        onDislike?.();
        setGone(true);
      }, 300);
    } else if (actionType === "save") {
      setPos((p) => ({ x: p.x, y: -h * 1.1 }));
      setAction("save");
      setTimeout(() => {
        onSave?.();
        setGone(true);
      }, 300);
    }
  }

  function cleanupPointerListeners() {
    try {
      const m = handlersRef.current.move;
      const u = handlersRef.current.up;
      if (m) window.removeEventListener("pointermove", m);
      if (u) window.removeEventListener("pointerup", u);
      handlersRef.current.move = null;
      handlersRef.current.up = null;
    } catch (e) {
      console.debug("cleanupPointerListeners (pointer) error", e);
    }
    try {
      const tm = handlersRef.current.touchMove;
      const te = handlersRef.current.touchEnd;
      if (tm) window.removeEventListener("touchmove", tm);
      if (te) window.removeEventListener("touchend", te);
      handlersRef.current.touchMove = null;
      handlersRef.current.touchEnd = null;
    } catch (e) {
      console.debug("cleanupPointerListeners (touch) error", e);
    }
    try {
      cardRef.current?.releasePointerCapture?.(pointerIdRef.current);
    } catch (e) {
      console.debug("cleanupPointerListeners (releasePointerCapture) error", e);
    }
  }

  const onPointerMoveWindow = useCallback((e) => {
    if (pointerIdRef.current == null || pointerIdRef.current !== e.pointerId)
      return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    setPos({ x: dx, y: dy });
  }, []);

  function onPointerUpWindow(e) {
    if (pointerIdRef.current == null || pointerIdRef.current !== e.pointerId)
      return;
    pointerIdRef.current = null;
    setIsDragging(false);

    const dx = posRef.current.x;
    const dy = posRef.current.y;
    const thresholdX = 120;
    const thresholdY = -120;

    if (dx > thresholdX) {
      settle("like");
      cleanupPointerListeners();
      return;
    }
    if (dx < -thresholdX) {
      settle("dislike");
      cleanupPointerListeners();
      return;
    }
    if (dy < thresholdY) {
      settle("save");
      cleanupPointerListeners();
      return;
    }

    setPos({ x: 0, y: 0 });
    setAction(null);
    cleanupPointerListeners();
  }

  function onPointerDown(e) {
    try {
      cardRef.current?.setPointerCapture?.(e.pointerId);
    } catch (err) {
      console.debug("setPointerCapture failed", err);
    }
    pointerIdRef.current = e.pointerId;
    startRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setAction(null);
    window.addEventListener("pointermove", onPointerMoveWindow);
    window.addEventListener("pointerup", onPointerUpWindow);
  }

  useImperativeHandle(ref, () => ({
    trigger(actionType) {
      if (!gone) settle(actionType);
    },
  }));

  function onTouchStart(e) {
    // Prevent the page from scrolling while swiping the card.
    // (Works because we also register `touchmove` with `{ passive: false }`.)
    e.preventDefault?.();
    const t = e.touches[0];
    if (!t) return;
    pointerIdRef.current = "touch";
    startRef.current = { x: t.clientX, y: t.clientY };
    setIsDragging(true);
    setAction(null);
    handlersRef.current.touchMove = onTouchMove;
    handlersRef.current.touchEnd = onTouchEnd;
    window.addEventListener("touchmove", handlersRef.current.touchMove, {
      passive: false,
    });
    window.addEventListener("touchend", handlersRef.current.touchEnd);
  }

  function onTouchMove(e) {
    if (pointerIdRef.current !== "touch") return;
    e.preventDefault?.();
    const t = e.touches[0];
    if (!t) return;
    const dx = t.clientX - startRef.current.x;
    const dy = t.clientY - startRef.current.y;
    setPos({ x: dx, y: dy });
  }

  function onTouchEnd(e) {
    if (pointerIdRef.current !== "touch") return;
    pointerIdRef.current = null;
    setIsDragging(false);

    try {
      const tm = handlersRef.current.touchMove;
      const te = handlersRef.current.touchEnd;
      if (tm) window.removeEventListener("touchmove", tm);
      if (te) window.removeEventListener("touchend", te);
      handlersRef.current.touchMove = null;
      handlersRef.current.touchEnd = null;
    } catch (e) {
      console.debug("onTouchEnd cleanup error", e);
    }

  // Use the ref so we don't accidentally read a stale `pos` value on mobile.
  const dx = posRef.current.x;
  const dy = posRef.current.y;
    const thresholdX = 120;
    const thresholdY = -120;

    if (dx > thresholdX) {
      settle("like");
      return;
    }
    if (dx < -thresholdX) {
      settle("dislike");
      return;
    }
    if (dy < thresholdY) {
      settle("save");
      return;
    }

    setPos({ x: 0, y: 0 });
    setAction(null);
  }

  if (gone) return null;

  const rotate = pos.x / 20;
  const transform = `translate(${pos.x}px, ${
    pos.y
  }px) rotate(${rotate}deg) scale(${isDragging ? 1.02 : 1})`;
  const transition = isDragging
    ? "none"
    : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";

  const likeOpacity = Math.min(Math.max(pos.x / 120, 0), 1);
  const dislikeOpacity = Math.min(Math.max(-pos.x / 120, 0), 1);
  const saveOpacity = Math.min(Math.max(-pos.y / 120, 0), 1);

  return (
    <div className="flex items-center justify-center px-4 py-6 ">
      <div
        ref={cardRef}
        onPointerDown={draggable ? onPointerDown : undefined}
        onTouchStart={draggable ? onTouchStart : undefined}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl "
        style={{
          transform,
          transition,
          // Allow vertical page scrolling, but we still prevent default while dragging the card.
          touchAction: draggable ? "pan-y" : "auto",
          cursor: draggable ? (isDragging ? "grabbing" : "grab") : "default",
        }}
      >
        <div className="relative">
          <Image
            alt={restaurant?.name ?? "Restaurant Image"}
            className="w-full h-96 object-cover object-top"
            src={restaurant?.image ?? "/restaurant-image.jpg"}
            width={400}
            height={400}
            loading="eager"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-900">0.8 km</span>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-xl shadow-sm transform"
              style={{ opacity: likeOpacity }}
            >
              <Heart className="text-red-500" />
              <span className="font-semibold text-sm text-gray-900">Like</span>
            </div>
            <div
              className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-xl shadow-sm transform"
              style={{ opacity: dislikeOpacity }}
            >
              <X className="text-gray-600" />
              <span className="font-semibold text-sm text-gray-900">Nope</span>
            </div>
            <div
              className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-xl shadow-sm transform"
              style={{ opacity: saveOpacity }}
            >
              <Bookmark className="text-blue-500" />
              <span className="font-semibold text-sm text-gray-900">Saved</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {restaurant?.name ?? "Restaurant"}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {(restaurant?.cuisine ?? []).map((c, i) => (
                  <span
                    key={i}
                    className="text-xs bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1.5 rounded-full ml-2">
              <Star className=" text-sm text-primary"></Star>
              <span className="text-sm font-bold text-gray-900">
                {restaurant?.rating ?? "-"}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {restaurant?.description ?? "Delicious food"}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CircleDollarSign className="h-5 text-gray-400"></CircleDollarSign>
                <span className="text-sm font-medium text-gray-700">
                  {restaurant?.price ?? "-"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-5 text-gray-400"></MessageCircle>
                <span className="text-sm text-gray-500">
                  {restaurant?.reviews ?? "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(CardInner);
