//This file is for any station-aligned or neutral factions, not JUST Nanotrasen.
//Try to keep them all a subtype of centcom/skyrat, for file sorting and balance - all faction representatives should have the same/similarly armored uniforms

/obj/item/clothing/under/rank/centcom
	worn_icon_digi = 'packages/clothing/assets/mob/under/centcom_digi.dmi'	// Anything that was in the rnd.dmi, should be in the rnd_digi.dmi

/obj/item/clothing/under/rank/centcom/skyrat
	icon = 'packages/clothing/assets/obj/under/centcom.dmi'
	worn_icon = 'packages/clothing/assets/mob/under/centcom.dmi'

/*
*	LOPLAND
*/
/obj/item/clothing/under/rank/centcom/skyrat/lopland
	name = "\improper Lopland corporate uniform"
	desc = "A sleek jumpsuit worn by Lopland corporate. Its surprisingly well padded."
	icon_state = "lopland_shirt"
	worn_icon_state = "lopland_shirt"

/obj/item/clothing/under/rank/centcom/skyrat/lopland/instructor
	name = "\improper Lopland instructor's uniform"
	desc = "A over-the-top, militaristic jumpsuit worn by Lopland-certified instructors, with a big Lopland logo slapped on the back. The amount of pockets could make a space marine cry."
	icon_state = "lopland_tac"
	worn_icon_state = "lopland_tac"


/*
*	MISC
*/
// pizza and other misc ERTs in this file too?
