/proc/random_features()
	//For now we will always return none for tail_human and ears.
	return MANDATORY_FEATURE_LIST

/proc/accessory_list_of_key_for_species(key, datum/species/S, mismatched, ckey)
	var/list/accessory_list = list()
	for(var/name in GLOB.sprite_accessories[key])
		var/datum/sprite_accessory/SP = GLOB.sprite_accessories[key][name]
		if(!mismatched && SP.recommended_species && !(S.id in SP.recommended_species))
			continue
		if(SP.ckey_whitelist && !SP.ckey_whitelist[ckey])
			continue
		accessory_list += SP.name
	return accessory_list


/proc/random_accessory_of_key_for_species(key, datum/species/S, mismatched=FALSE, ckey)
	var/list/accessory_list = accessory_list_of_key_for_species(key, S, mismatched, ckey)
	var/datum/sprite_accessory/SP = GLOB.sprite_accessories[key][pick(accessory_list)]
	if(!SP)
		CRASH("Cant find random accessory of [key] key, for species [S.id]")
	return SP

/proc/random_unique_vox_name(attempts_to_find_unique_name=10)
	for(var/i in 1 to attempts_to_find_unique_name)
		. = capitalize(vox_name())

		if(!findname(.))
			break

/proc/random_unique_teshari_name(attempts_to_find_unique_name=10)
	for(var/i in 1 to attempts_to_find_unique_name)
		. = capitalize(teshari_name())

		if(!findname(.))
			break

/proc/assemble_body_markings_from_set(datum/body_marking_set/BMS, list/features, datum/species/pref_species)
	var/list/body_markings = list()
	for(var/set_name in BMS.body_marking_list)
		var/datum/body_marking/BM = GLOB.body_markings[set_name]
		for(var/zone in GLOB.body_markings_per_limb)
			var/list/marking_list = GLOB.body_markings_per_limb[zone]
			if(set_name in marking_list)
				if(!body_markings[zone])
					body_markings[zone] = list()
				body_markings[zone][set_name] = list(BM.get_default_color(features, pref_species), FALSE)
	return body_markings
