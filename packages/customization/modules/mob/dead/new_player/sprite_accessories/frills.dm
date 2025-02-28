/datum/sprite_accessory/frills
	key = "frills"
	generic = "Frills"
	default_color = DEFAULT_SECONDARY
	relevent_layers = list(BODY_ADJ_LAYER)
	genetic = TRUE
	organ_type = /obj/item/organ/external/frills

/datum/sprite_accessory/frills/is_hidden(mob/living/carbon/human/human)
	if((human.head?.flags_inv & HIDEEARS) || (key in human.try_hide_mutant_parts))
		return TRUE

	return FALSE

/datum/sprite_accessory/frills/divinity
	name = "Divinity"
	icon_state = "divinity"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'

/datum/sprite_accessory/frills/horns
	name = "Horns"
	icon_state = "horns"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'

/datum/sprite_accessory/frills/hornsdouble
	name = "Horns Double"
	icon_state = "hornsdouble"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'

/datum/sprite_accessory/frills/big
	name = "Big"
	icon_state = "big"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'

/datum/sprite_accessory/frills/cobrahood
	name = "Cobra Hood"
	icon_state = "cobrahood"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'
	color_src = USE_MATRIXED_COLORS

/datum/sprite_accessory/frills/cobrahoodears
	name = "Cobra Hood (Ears)"
	icon_state = "cobraears"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'
	color_src = USE_MATRIXED_COLORS

/datum/sprite_accessory/frills/neckfrills
	name = "Neck Frills"
	icon_state = "neck"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'

/datum/sprite_accessory/frills/neckfrillsfuller
	name = "Neck Frills (Fuller)"
	icon_state = "neckfull"
	icon = 'packages/customization/assets/sprite_accessory/frills.dmi'
