/** 背景の浮遊する図形。静かに動くだけ（SPEC §1）。 */
export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <span className="bg__blob bg__blob--1" />
      <span className="bg__blob bg__blob--2" />
      <span className="bg__blob bg__blob--3" />
      <span className="bg__blob bg__blob--4" />
      <span className="bg__blob bg__blob--5" />
    </div>
  )
}
