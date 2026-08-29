'use client'

/*
  Deep End hero — an interactive underwater lane pool you swim down to read the
  career timeline. Ported from the design's `pool-world.js` custom element into a
  React client component so it can use the project's own `three` dependency
  rather than the design canvas's CDN import map.

  Differences from the source module, all deliberate:
  - three.js is imported dynamically inside the effect, so it stays out of the
    server bundle and is code-split away from first paint.
  - The overlay chrome (hint, detail panel, depth rail) is React-rendered.
  - Wheel events only swallow page scroll while there is lane left to swim; at
    either end the page scrolls normally, so the hero never traps the reader.
*/

import { useEffect, useRef, useState } from 'react'
import type { Milestone } from './siteData'

const LANE_COLORS = [0xffffff, 0x1e6fd9, 0xffffff, 0xe4552f, 0xffffff]

export default function PoolWorld({ milestones }: { milestones: Milestone[] }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFailed(true)
      return
    }

    let disposed = false
    let cleanup: (() => void) | undefined

    ;(async () => {
      let THREE: typeof import('three')
      try {
        THREE = await import('three')
      } catch {
        if (!disposed) setFailed(true)
        return
      }
      if (disposed) return

      /* ---------- procedural textures ---------- */

      const tileTexture = () => {
        const c = document.createElement('canvas')
        c.width = c.height = 256
        const x = c.getContext('2d')!
        x.fillStyle = '#bfe4ef'
        x.fillRect(0, 0, 256, 256)
        x.strokeStyle = '#8cc3d6'
        x.lineWidth = 6
        for (let i = 0; i <= 256; i += 64) {
          x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke()
          x.beginPath(); x.moveTo(0, i); x.lineTo(256, i); x.stroke()
        }
        const t = new THREE.CanvasTexture(c)
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(10, 90)
        return t
      }

      const causticTexture = () => {
        const c = document.createElement('canvas')
        c.width = c.height = 128
        const t = new THREE.CanvasTexture(c)
        t.wrapS = t.wrapT = THREE.RepeatWrapping
        t.repeat.set(6, 40)
        const ctx = c.getContext('2d')!
        const img = ctx.createImageData(128, 128)
        const update = (time: number) => {
          const d = img.data
          for (let y = 0; y < 128; y++) {
            for (let x = 0; x < 128; x++) {
              const i = (y * 128 + x) * 4
              const v =
                Math.sin(x * 0.13 + time * 1.1) +
                Math.sin(y * 0.11 - time * 0.9) +
                Math.sin((x + y) * 0.09 + time * 1.6) +
                Math.sin((x - y) * 0.12 - time * 0.7)
              const a = Math.pow(Math.max(0, v / 4 + 0.35), 3.2) * 255
              d[i] = 255; d[i + 1] = 255; d[i + 2] = 255
              d[i + 3] = Math.min(255, a)
            }
          }
          ctx.putImageData(img, 0, 0)
          t.needsUpdate = true
        }
        return { texture: t, update }
      }

      const labelTexture = (year: string) => {
        const c = document.createElement('canvas')
        c.width = 512; c.height = 256
        const x = c.getContext('2d')!
        x.clearRect(0, 0, 512, 256)
        x.fillStyle = 'rgba(6,32,48,0.55)'
        x.beginPath(); x.roundRect(16, 60, 480, 136, 68); x.fill()
        x.strokeStyle = 'rgba(255,255,255,0.75)'
        x.lineWidth = 5
        x.beginPath(); x.roundRect(16, 60, 480, 136, 68); x.stroke()
        x.fillStyle = '#ffffff'
        x.font = '600 84px ui-monospace, SFMono-Regular, Menlo, monospace'
        x.textAlign = 'center'
        x.textBaseline = 'middle'
        x.fillText(year, 256, 130)
        return new THREE.CanvasTexture(c)
      }

      /* ---------- scene ---------- */

      const w = host.clientWidth || 900
      const h = host.clientHeight || 600

      let renderer: import('three').WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
      } catch {
        setFailed(true)
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h)
      renderer.domElement.style.display = 'block'
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0b3d5c)
      scene.fog = new THREE.Fog(0x0b3d5c, 18, 78)

      const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 200)
      camera.position.set(0, 2.4, 6)

      scene.add(new THREE.HemisphereLight(0xcdf0ff, 0x03243a, 1.5))
      const sun = new THREE.DirectionalLight(0xffffff, 1.1)
      sun.position.set(3, 12, 4)
      scene.add(sun)

      const LEN = 120

      const floorTex = tileTexture()
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(34, LEN),
        new THREE.MeshLambertMaterial({ map: floorTex })
      )
      floor.rotation.x = -Math.PI / 2
      floor.position.set(0, -3.2, -LEN / 2 + 10)
      scene.add(floor)

      const caustic = causticTexture()
      const caust = new THREE.Mesh(
        new THREE.PlaneGeometry(34, LEN),
        new THREE.MeshBasicMaterial({
          map: caustic.texture,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      )
      caust.rotation.x = -Math.PI / 2
      caust.position.set(0, -3.15, -LEN / 2 + 10)
      scene.add(caust)

      const wallTex = tileTexture()
      const wallMat = new THREE.MeshLambertMaterial({ map: wallTex })
      ;[-17, 17].forEach((x) => {
        const wall = new THREE.Mesh(new THREE.PlaneGeometry(LEN, 9), wallMat)
        wall.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2
        wall.position.set(x, 1.3, -LEN / 2 + 10)
        scene.add(wall)
      })

      const surf = new THREE.Mesh(
        new THREE.PlaneGeometry(34, LEN, 24, 90),
        new THREE.MeshBasicMaterial({
          color: 0x9fe4f7,
          transparent: true,
          opacity: 0.28,
          side: THREE.DoubleSide,
        })
      )
      surf.rotation.x = Math.PI / 2
      surf.position.set(0, 5.4, -LEN / 2 + 10)
      const surfBase = (surf.geometry.attributes.position.array as Float32Array).slice()
      scene.add(surf)

      const ropeGeo = new THREE.SphereGeometry(0.24, 10, 8)
      ;[-9, -4.5, 0, 4.5, 9].forEach((x, li) => {
        const g = new THREE.Group()
        for (let i = 0; i < 150; i++) {
          const m = new THREE.Mesh(
            ropeGeo,
            new THREE.MeshLambertMaterial({
              color: LANE_COLORS[(li + Math.floor(i / 5)) % LANE_COLORS.length],
            })
          )
          m.position.set(x, 4.6, 8 - i * 0.85)
          g.add(m)
        }
        scene.add(g)
      })

      const stripeMat = new THREE.MeshBasicMaterial({ color: 0x14486b })
      ;[-6.75, -2.25, 2.25, 6.75].forEach((x) => {
        const s = new THREE.Mesh(new THREE.PlaneGeometry(0.9, LEN - 14), stripeMat)
        s.rotation.x = -Math.PI / 2
        s.position.set(x, -3.14, -LEN / 2 + 10)
        scene.add(s)
      })

      type MarkerData = {
        data: Milestone
        ring: import('three').Mesh
        base: number
        phase: number
      }
      const markers: import('three').Group[] = []
      milestones.forEach((m, i) => {
        const z = -6 - i * 16
        const x = i % 2 === 0 ? -6.75 : 6.75
        const g = new THREE.Group()
        g.position.set(x, 0.4, z)

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.5, 0.16, 12, 40),
          new THREE.MeshStandardMaterial({
            color: 0xfff1d6,
            emissive: 0xe4552f,
            emissiveIntensity: 0.5,
            roughness: 0.4,
          })
        )
        g.add(ring)

        const disc = new THREE.Mesh(
          new THREE.CircleGeometry(1.42, 40),
          new THREE.MeshBasicMaterial({ color: 0x062033, transparent: true, opacity: 0.55 })
        )
        disc.position.z = -0.02
        g.add(disc)

        const label = new THREE.Mesh(
          new THREE.PlaneGeometry(2.6, 1.3),
          new THREE.MeshBasicMaterial({ map: labelTexture(m.year), transparent: true })
        )
        label.position.set(0, 2.5, 0)
        g.add(label)

        const line = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 3.6, 6),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
        )
        line.position.y = -1.8
        g.add(line)

        g.userData = { data: m, ring, base: 0.4, phase: i * 1.3 } satisfies MarkerData
        scene.add(g)
        markers.push(g)
      })

      const N = 700
      const pos = new Float32Array(N * 3)
      const seed = new Float32Array(N)
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 32
        pos[i * 3 + 1] = Math.random() * 8 - 3
        pos[i * 3 + 2] = -Math.random() * LEN + 8
        seed[i] = Math.random() * 6.28
      }
      const bg = new THREE.BufferGeometry()
      bg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const bubbles = new THREE.Points(
        bg,
        new THREE.PointsMaterial({
          color: 0xdff6ff,
          size: 0.1,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        })
      )
      scene.add(bubbles)

      /* ---------- interaction ---------- */

      /*
        The panel and hint are written straight to the DOM rather than held in
        React state. The render loop can change the surfaced marker on any
        frame, and routing that through setState re-renders this component
        (which owns an imperatively-appended canvas) fast enough to lock up the
        renderer. This is how the original pool-world.js did it too.
      */
      const showMilestone = (m: Milestone | null) => {
        const panel = panelRef.current
        if (!panel) return
        if (m) {
          if (yearRef.current) yearRef.current.textContent = m.year
          if (titleRef.current) titleRef.current.textContent = m.title
          if (bodyRef.current) bodyRef.current.textContent = m.body
          panel.style.opacity = '1'
          panel.style.transform = 'translateY(0)'
        } else {
          panel.style.opacity = '0'
          panel.style.transform = 'translateY(12px)'
        }
      }
      const hideHint = () => {
        if (hintRef.current) hintRef.current.style.opacity = '0'
      }

      const raycaster = new THREE.Raycaster()
      const pointer = new THREE.Vector2(-2, -2)
      const maxZ = (markers.length - 1) * 16 + 14
      let progress = 0
      let target = 0
      let mx = 0
      let my = 0
      let shownIndex = -1

      const ro = new ResizeObserver(() => {
        const cw = host.clientWidth
        const ch = host.clientHeight
        if (!cw || !ch) return
        renderer.setSize(cw, ch, false)
        renderer.domElement.style.width = cw + 'px'
        renderer.domElement.style.height = ch + 'px'
        camera.aspect = cw / ch
        camera.updateProjectionMatrix()
      })
      ro.observe(host)

      const onWheel = (e: WheelEvent) => {
        const next = target + e.deltaY * 0.0011
        // Only capture the wheel while there is lane left in that direction —
        // otherwise let the page scroll on past the hero.
        if (next > 0 && next < 1) e.preventDefault()
        target = Math.max(0, Math.min(1, next))
        hideHint()
      }
      host.addEventListener('wheel', onWheel, { passive: false })

      let dragging = false
      let lastY = 0
      let moved = 0

      const pick = () => {
        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObjects(markers, true)
        if (hits.length) {
          let o: import('three').Object3D | null = hits[0].object
          while (o && !(o.userData as MarkerData)?.data) o = o.parent
          if (o) showMilestone((o.userData as MarkerData).data)
        }
      }

      const onPointerDown = (e: PointerEvent) => {
        dragging = true
        lastY = e.clientY
        moved = 0
        host.style.cursor = 'grabbing'
        host.setPointerCapture(e.pointerId)
      }
      const onPointerMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect()
        mx = ((e.clientX - r.left) / r.width) * 2 - 1
        my = ((e.clientY - r.top) / r.height) * 2 - 1
        pointer.set(mx, -my)
        if (dragging) {
          const d = e.clientY - lastY
          lastY = e.clientY
          moved += Math.abs(d)
          target = Math.max(0, Math.min(1, target + d * 0.0016))
          hideHint()
        }
      }
      const onPointerUp = (e: PointerEvent) => {
        if (dragging && moved < 5) pick()
        dragging = false
        host.style.cursor = 'grab'
        try { host.releasePointerCapture(e.pointerId) } catch { /* already released */ }
      }
      const onPointerLeave = () => pointer.set(-2, -2)

      host.addEventListener('pointerdown', onPointerDown)
      host.addEventListener('pointermove', onPointerMove)
      host.addEventListener('pointerup', onPointerUp)
      host.addEventListener('pointercancel', onPointerUp)
      host.addEventListener('pointerleave', onPointerLeave)

      /* ---------- loop ---------- */

      let raf = 0
      let frame = 0
      let running = false
      let onScreen = true

      const start = () => {
        if (running) return
        running = true
        raf = requestAnimationFrame(loop)
      }
      const stop = () => {
        running = false
        cancelAnimationFrame(raf)
      }

      const loop = (t: number) => {
        if (!running) return
        raf = requestAnimationFrame(loop)
        const time = t * 0.001
        progress += (target - progress) * 0.07

        const z = 6 - progress * maxZ
        camera.position.z = z

        /*
          Surface whichever marker the camera is currently alongside, so the
          detail panel reads itself as you swim rather than needing a click.
          Markers sit 16 units apart, so a range of 9 covers the gaps between
          them: once you are into the run the panel stays up and swaps from one
          entry to the next as you pass each marker, rather than blinking out in
          between. It stays hidden at the very start so the headline lands on
          clean water. The panel only writes when the marker actually changes —
          this runs every frame.
        */
        const REVEAL_RANGE = 9
        let nearest = -1
        let nearestDist = Infinity
        for (let i = 0; i < markers.length; i++) {
          const d = Math.abs(markers[i].position.z - z)
          if (d < nearestDist) {
            nearestDist = d
            nearest = i
          }
        }
        const next = nearestDist <= REVEAL_RANGE ? nearest : -1
        if (next !== shownIndex) {
          shownIndex = next
          showMilestone(next === -1 ? null : milestones[next])
          if (next !== -1) hideHint()
        }
        camera.position.x += (mx * 2.2 - camera.position.x) * 0.05
        camera.position.y +=
          (2.4 - my * 1.2 + Math.sin(time * 0.9) * 0.12 - camera.position.y) * 0.05
        camera.lookAt(camera.position.x * 0.35, 1.2 - my * 0.8, z - 12)

        if (frame++ % 2 === 0) caustic.update(time)

        const p = surf.geometry.attributes.position
        const arr = p.array as Float32Array
        for (let i = 0; i < p.count; i++) {
          const bx = surfBase[i * 3]
          const by = surfBase[i * 3 + 1]
          arr[i * 3 + 2] =
            Math.sin(bx * 0.5 + time * 1.4) * 0.22 + Math.sin(by * 0.35 - time * 1.1) * 0.22
        }
        p.needsUpdate = true

        markers.forEach((m) => {
          const u = m.userData as MarkerData
          m.position.y = u.base + Math.sin(time * 1.1 + u.phase) * 0.28
          u.ring.rotation.z = time * 0.3 + u.phase
          m.children.forEach((c) => {
            const mesh = c as import('three').Mesh
            if (mesh.geometry && mesh.geometry.type === 'PlaneGeometry') {
              mesh.lookAt(camera.position)
            }
          })
        })

        const bp = bubbles.geometry.attributes.position
        const ba = bp.array as Float32Array
        for (let i = 0; i < bp.count; i++) {
          ba[i * 3 + 1] += 0.012 + (i % 5) * 0.002
          ba[i * 3] += Math.sin(time + seed[i]) * 0.004
          if (ba[i * 3 + 1] > 5.2) ba[i * 3 + 1] = -3.1
        }
        bp.needsUpdate = true

        if (knobRef.current) knobRef.current.style.top = progress * 100 + '%'
        renderer.render(scene, camera)
      }
      /*
        Only animate while the hero is actually on screen and the tab is
        visible. The per-frame work here is heavy (surface ripple, 700 bubbles,
        a regenerated caustic texture); left running under the rest of the page
        it burns battery and starves the main thread badly enough that lazily
        loaded images further down never get a chance to decode.
      */
      const io = new IntersectionObserver(
        ([e]) => {
          onScreen = e.isIntersecting
          if (onScreen && !document.hidden) start()
          else stop()
        },
        { threshold: 0 }
      )
      io.observe(host)

      const onVisibility = () => {
        if (document.hidden) stop()
        else if (onScreen) start()
      }
      document.addEventListener('visibilitychange', onVisibility)

      start()

      cleanup = () => {
        stop()
        io.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        ro.disconnect()
        host.removeEventListener('wheel', onWheel)
        host.removeEventListener('pointerdown', onPointerDown)
        host.removeEventListener('pointermove', onPointerMove)
        host.removeEventListener('pointerup', onPointerUp)
        host.removeEventListener('pointercancel', onPointerUp)
        host.removeEventListener('pointerleave', onPointerLeave)
        scene.traverse((o) => {
          const mesh = o as import('three').Mesh
          if (mesh.geometry) mesh.geometry.dispose()
          const mat = mesh.material
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
          else if (mat) mat.dispose()
        })
        renderer.dispose()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [milestones])

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 overflow-hidden bg-[#062033] cursor-grab touch-pan-y"
      aria-hidden="true"
    >
      {!failed && (
        <>
          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-[22px] left-1/2 -translate-x-1/2 font-mono text-[12px] leading-none uppercase tracking-[.16em] text-white/70 transition-opacity duration-500"
          >
            scroll or drag to swim down the lane
          </div>

          <div
            ref={panelRef}
            className="pointer-events-none absolute bottom-8 left-8 max-w-[380px] translate-y-3 border border-white/20 bg-[#041624]/85 px-[26px] pt-6 pb-[26px] text-[#eaf6fb] opacity-0 backdrop-blur-[14px] transition-all duration-300"
          >
            <div
              ref={yearRef}
              className="font-mono text-[12px] font-medium leading-none tracking-[.2em] text-[#7fd0ee]"
            />
            <div ref={titleRef} className="mt-[10px] font-serif text-[22px] leading-[1.25]" />
            <div ref={bodyRef} className="mt-3 text-[14px] leading-[1.6] text-[#eaf6fb]/80" />
          </div>

          <div className="absolute right-[26px] top-[26px] bottom-[26px] w-[2px] bg-white/15">
            <div
              ref={knobRef}
              className="absolute -left-1 top-0 h-[10px] w-[10px] rounded-full bg-white transition-[top] duration-150 ease-linear"
            />
          </div>
        </>
      )}
    </div>
  )
}
