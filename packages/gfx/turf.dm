/turf/closed/wall
	icon = 'packages/gfx/assets/turf/walls/wall.dmi'
	canSmoothWith = SMOOTH_GROUP_AIRLOCK + SMOOTH_GROUP_WINDOW_FULLTILE + SMOOTH_GROUP_WALLS

/turf/closed/wall/r_wall
	icon = 'packages/gfx/assets/turf/walls/reinforced_wall.dmi'

/turf/closed/wall/rust
	icon = 'packages/gfx/assets/turf/walls/wall.dmi'
	icon_state = "wall-0"
	base_icon_state = "wall"

/turf/closed/wall/r_wall/rust
	icon = 'packages/gfx/assets/turf/walls/reinforced_wall.dmi'
	icon_state = "reinforced_wall-0"
	base_icon_state = "reinforced_wall"

/turf/closed/wall/rust/New(loc, ...)
	. = ..()
	var/mutable_appearance/rust = mutable_appearance(icon, "rust")
	add_overlay(rust)

/turf/closed/wall/r_wall/rust/New(loc, ...)
	. = ..()
	var/mutable_appearance/rust = mutable_appearance(icon, "rust")
	add_overlay(rust)

/turf/closed/wall/material
	icon = 'packages/gfx/assets/turf/walls/material_wall.dmi'
	icon_state = "wall-0"
	base_icon_state = "wall"
