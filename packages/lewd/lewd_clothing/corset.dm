#define TIGHT_SLOWDOWN 2

/obj/item/clothing/suit/corset
	name = "corset"
	desc = "A tight latex corset. How can anybody fit in THAT?"
	icon_state = "corset"
	inhand_icon_state = null
	icon = 'packages/lewd/assets/obj/lewd_clothing/lewd_suits.dmi'
	worn_icon = 'packages/lewd/assets/mob/lewd_clothing/lewd_suit/lewd_suits.dmi'
	worn_icon_digi = 'packages/lewd/assets/mob/lewd_clothing/lewd_suit/lewd_suits-digi.dmi'
	worn_icon_taur_snake = 'packages/lewd/assets/mob/lewd_clothing/lewd_suit/lewd_suits-snake.dmi'
	worn_icon_taur_paw = 'packages/lewd/assets/mob/lewd_clothing/lewd_suit/lewd_suits-paw.dmi'
	worn_icon_taur_hoof = 'packages/lewd/assets/mob/lewd_clothing/lewd_suit/lewd_suits-hoof.dmi'
	body_parts_covered = CHEST
	slowdown = 1 // You can't run with that thing literally squeezing your chest

	/// Has it been laced tightly?
	var/laced_tight = FALSE

/obj/item/clothing/suit/corset/AltClick(mob/user)
	laced_tight = !laced_tight
	to_chat(user, span_notice("You [laced_tight ? "tighten" : "loosen"] the corset, making it far [laced_tight ? "harder" : "easier"] to breathe."))
	playsound(user, laced_tight ? 'sound/items/handling/cloth_pickup.ogg' : 'sound/items/handling/cloth_drop.ogg', 40, TRUE)
	if(laced_tight)
		slowdown = TIGHT_SLOWDOWN
		return
	slowdown = initial(slowdown)

/obj/item/clothing/suit/corset/equipped(mob/living/carbon/human/user, slot)
	. = ..()
	if(laced_tight && src == user.wear_suit)
		to_chat(user, span_purple("The corset squeezes tightly against your ribs! Breathing suddenly feels much more difficult."))

/obj/item/clothing/suit/corset/dropped(mob/living/carbon/human/user)
	. = ..()
	if(laced_tight && src == user.wear_suit)
		to_chat(user, span_purple("Phew. Now you can breathe normally."))

#undef TIGHT_SLOWDOWN
