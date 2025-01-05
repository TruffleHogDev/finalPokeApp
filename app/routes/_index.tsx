import { useEffect, useState } from "react";
import {
  ClientLoaderFunctionArgs,
  Form,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import pokeBall from "../images/pokeBall.png";
import "app/index.css";

const pokemonNameMap = {
  "Mr. Mime": "mr-mime",
  "mr. mime": "mr-mime",
  "mr mime": "mr-mime",
  "Mr. Rime": "mr-rime",
  "mr rime": "mr-rime",
  "mr. rime": "mr-rime",
  wishiwashi: "wishiwashi-solo",
  Wishiwashi: "wishiwashi-solo",
  "wishiwashi solo": "wishiwashi-solo",
  "Wishiwashi Solo": "wishiwashi-solo",
  "wishiwashi school": "wishiwashi-school",
  "Wishiwashi School": "wishiwashi-school",
  "Scream Tail": "scream-tail",
  "Flutter Mane": "flutter-mane",
  "Iron Moth": "iron-moth",
  "Iron Jugulis": "iron-jugulis",
  "Iron Bundle": "iron-bundle",
  "Great Tusk": "great-tusk",
  "Brute Bonnet": "brute-bonnet",
  "Slither Wing": "slither-wing",
  "Sandy Shocks": "sandy-shocks",
  "Roaring Moon": "roaring-moon",
  "Walking Wake": "walking-wake",
  "Gouging Fire": "gouging-fire",
  "Raging Bolt": "raging-bolt",
  "Iron Treads": "iron-treads",
  "Iron Hands": "iron-hands",
  "Iron Thorns": "iron-thorns",
  "Iron Valiant": "iron-valiant",
  "Iron Leaves": "iron-leaves",
  "Iron Boulder": "iron-boulder",
  "Iron Crown": "iron-crown",
  "type null": "type-null",
  "Type: Null": "type-null",
  "Type:Null": "type-null",
  "type:null": "type-null",
  "type: null": "type-null",
  "Porygon Z": "porygon-z",
  "porygon z": "porygon-z",
  "Porygon 2": "porygon2",
  "porygon 2": "porygon2",
  "zacian-c": "zacian-crowned",
  "Zacian-C": "zacian-crowned",
  "zacian c": "zacian-crowned",
  "Zacian C": "zacian-crowned",
  "Zacian c": "zacian-crowned",
  "zacian C": "zacian-crowned",
  "Zacian-crowned": "zacian-crowned",
  "Zacian-Crowned": "zacian-crowned",
  "zacian crowned": "zacian-crowned",
  "Zacian Crowned": "zacian-crowned",
  "zamazenta-c": "zamazenta-crowned",
  "Zamazenta-C": "zamazenta-crowned",
  "zamazenta-C": "zamazenta-crowned",
  "Zamazenta-c": "zamazenta-crowned",
  "zamazenta c": "zamazenta-crowned",
  "Zamazenta C": "zamazenta-crowned",
  "zamazenta C": "zamazenta-crowned",
  "Zamazenta c": "zamazenta-crowned",
  "zamazenta crowned": "zamazenta-crowned",
  "Zamazenta Crowned": "zamazenta-crowned",
  "farfetch'd": "farfetchd",
  "sirfetch'd": "sirfetchd",
  fug: "rayquaza",
  "mega fug": "rayquaza-mega",
  "mega rayquaza": "rayquaza-mega",
  "Mega Rayquaza": "rayquaza-mega",
  "mega glalie": "glalie-mega",
  "Mega Glalie": "glalie-mega",
  "mega garchomp": "garchomp-mega",
  "Mega Garchomp": "garchomp-mega",
  "mega venusaur": "venusaur-mega",
  "Mega Venusaur": "venusaur-mega",
  "charizard y": "charizard-mega-y",
  "Charizard Y": "charizard-mega-y",
  "mega charizard y": "charizard-mega-y",
  "Mega Charizard y": "charizard-mega-y",
  "megazard y": "charizard-mega-y",
  "Megazard Y": "charizard-mega-y",
  "charizard x": "charizard-mega-x",
  "Charizard X": "charizard-mega-x",
  "mega charizard X": "charizard-mega-x",
  "Mega Charizard X": "charizard-mega-x",
  "megazard x": "charizard-mega-x",
  "Megazard X": "charizard-mega-x",
  "mega blastoise": "blastoise-mega",
  "Mega Blastoise": "blastoise-mega",
  "mega alakazam": "alakazam-mega",
  "Mega Alakazam": "alakazam-mega",
  "mega gengar": "gengar-mega",
  "Mega Gengar": "gengar-mega",
  "mega kangaskhan": "kangaskhan-mega",
  "Mega Kangaskhan": "kangaskhan-mega",
  "mega pinsir": "pinsir-mega",
  "Mega Pinsir": "pinsir-mega",
  "mega scizor": "scizor-mega",
  "Mega Scizor": "scizor-mega",
  "mega gyarados": "gyarados-mega",
  "Mega Gyarados": "gyarados-mega",
  "mega aerodactyl": "aerodactyl-mega",
  "Mega Aerodactyl": "aerodactyl-mega",
  "mega mewtwo x": "mewtwo-mega-x",
  "Mega Mewtwo X": "mewtwo-mega-x",
  "mega mewtwo y": "mewtwo-mega-y",
  "Mega Mewtwo Y": "mewtwo-mega-Y",
  "mega ampharos": "ampharos-mega",
  "Mega Ampharos": "ampharos-mega",
  "mega-heracross": "heracross-mega",
  "Mega-Heracross": "heracross-mega",
  "mega houndoom": "houndoom-mega",
  "Mega Houndoom": "houndoom-mega",
  "mega tyranitar": "tyranitar-mega",
  "Mega Tyranitar": "tyranitar-mega",
  "mega blaziken": "blaziken-mega",
  "Mega Blaziken": "blaziken-mega",
  "mega gardevoir": "gardevoir-mega",
  "Mega Gardevoir": "gardevoir-mega",
  "mega mawile": "mawile-mega",
  "Mega Mawile": "mawile-mega",
  "mega aggron": "aggron-mega",
  "Mega Aggron": "aggron-mega",
  "mega medicham": "medicham-mega",
  "Mega Medicham": "medicham-mega",
  "mega manectric": "manectric-mega",
  "Mega Manectric": "manectric-mega",
  "mega banette": "banette-mega",
  "Mega Banette": "banette-mega",
  "mega absol": "absol-mega",
  "Mega Absol": "absol-mega",
  "mega latias": "latias-mega",
  "Mega Latias": "latias-mega",
  "mega latios": "latios-mega",
  "Mega Latios": "latios-mega",
  "mega lucario": "lucario-mega",
  "Mega Lucario": "lucario-mega",
  "mega abomasnow": "abomasnow-mega",
  "Mega Abomasnow": "abomasnow-mega",
  "mega beedrill": "beedrill-mega",
  "Mega Beedrill": "beedrill-mega",
  "mega pidgeot": "pidgeot-mega",
  "Mega Pidgeot": "pidgeot-mega",
  "mega slowbro": "slowbro-mega",
  "Mega Slowbro": "slowbro-mega",
  "mega steelix": "steelix-mega",
  "Mega Steelix": "steelix-mega",
  "mega sceptile": "sceptile-mega",
  "Mega Sceptile": "sceptile-mega",
  "mega swampert": "swampert-mega",
  "Mega Swampert": "swampert-mega",
  "mega sableye": "sableye-mega",
  "Mega Sableye": "sableye-mega",
  "mega sharpedo": "sharpedo-mega",
  "Mega Sharpedo": "sharpedo-mega",
  "mega camerupt": "camerupt-mega",
  "Mega Camerupt": "camerupt-mega",
  "mega altaria": "altaria-mega",
  "Mega Altaria": "altaria-mega",
  "mega salamence": "salamence-mega",
  "Mega Salamence": "salamence-mega",
  "mega metagross": "metagross-mega",
  "Mega Metagross": "metagross-mega",
  "mega lopunny": "lopunny-mega",
  "Mega Lopunny": "lopunny-mega",
  "mega gallade": "gallade-mega",
  "Mega Gallade": "gallade-mega",
  "mega audino": "audino-mega",
  "Mega Audino": "audino-mega",
  "mega diancie": "diancie-mega",
  "Mega Diancie": "diancie-mega",
  ralph: "sandshrew-alola",
  "alolan sandshrew": "sandshrew-alola",
  "Alolan Sandshrew": "sandshrew-alola",
  "alolan sandslash": "sandslash-alola",
  "Alolan Sandslash": "sandslash-alola",
  "alolan rattata": "rattata-alola",
  "Alolan Rattata": "rattata-alola",
  "alolan raticate": "raticate-alola",
  "Alolan Raticate": "raticate-alola",
  "alolan raichu": "raichu-alola",
  "Alolan Raichu": "raichu-alola",
  "alolan vulpix": "vulpix-alola",
  "Alolan Vulpix": "vulpix-alola",
  "alolan ninetales": "ninetales-alola",
  "Alolan Ninetales": "ninetales-alola",
  "alolan diglett": "diglett-alola",
  "Alolan Diglett": "diglett-alola",
  "alolan dugtrio": "dugtrio-alola",
  "Alolan Dugtrio": "dugtrio-alola",
  "alolan meowth": "meowth-alola",
  "Alolan Meowth": "meowth-alola",
  "alolan persian": "persian-alola",
  "Alolan Persian": "persian-alola",
  "alolan geodude": "geodude-alola",
  "Alolan Geodude": "geodude-alola",
  "alolan graveler": "graveler-alola",
  "Alolan Graveler": "graveler-alola",
  "alolan golem": "golem-alola",
  "Alolan Golem": "golem-alola",
  "alolan grimer": "grimer-alola",
  "Alolan Grimer": "grimer-alola",
  "alolan muk": "muk-alola",
  "Alolan Muk": "muk-alola",
  "alolan exeggutor": "exeggutor-alola",
  "Alolan Exeggutor": "exeggutor-alola",
  "alolan marowak": "marowak-alola",
  "Alolan Marowak": "marowak-alola",
  "galarian meowth": "meowth-galar",
  "Galarian Meowth": "meowth-galar",
  "galarian ponyta": "ponyta-galar",
  "Galarian Ponyta": "ponyta-galar",
  "galarian rapidash": "rapidash-galar",
  "Galarian Rapidash": "rapidash-galar",
  "galarian slowpoke": "slowpoke-galar",
  "Galarian Slowpoke": "slowpoke-galar",
  "galarian slowbro": "slowbro-galar",
  "Galarian Slowbro": "slowbro-galar",
  "galarian slowking": "slowking-galar",
  "Galarian Slowking": "slowking-galar",
  "galarian weezing": "weezing-galar",
  "Galarian Weezing": "weezing-galar",
  "galarian mr mime": "mr-mime-galar",
  "Galarian Mr Mime": "mr-mime-galar",
  "galarian mr. mime": "mr-mime-galar",
  "Galarian Mr. Mime": "mr-mime-galar",
  "galarian corsola": "corsola-galar",
  "Galarian Corsola": "corsola-galar",
  "galarian zigzagoon": "zigzagoon-galar",
  "Galarian Zigzagoon": "zigzagoon-galar",
  "galarian linoone": "linoone-galar",
  "Galarian Linoone": "linoone-galar",
  "galarian darumaka": "darumaka-galar",
  "Galarian Darumaka": "darumaka-galar",
  "galarian darmanitan": "darmanitan-galar",
  "Galarian Darmanitan": "darmanitan-galar",
  "zen mode darmanitan": "darmanitan-zen",
  "Zen Mode Darmanitan": "darmanitan-zen",
  "zen darmanitan": "darmanitan-zen",
  "Zen Darmanitan": "darmanitan-zen",
  "galarian zen darmanitan": "darmanitan-galar-zen",
  "Galarian Zen Darmanitan": "darmanitan-galar-zen",
  "galarian zen mode darmanitan": "darmanitan-galar-zen",
  "Galarian Zen Mode Darmanitan": "darmanitan-galar-zen",
  "galarian yamask": "yamask-galar",
  "Galarian Yamask": "yamask-galar",
  "galarian stunfisk": "stunfisk-galar",
  "Galarian Stunfisk": "stunfisk-galar",
  "galarian articuno": "articuno-galar",
  "Galarian Articuno": "articuno-galar",
  "galarian zapdos": "zapdos-galar",
  "Galarian Zapdos": "zapdos-galar",
  "galarian moltres": "moltres-galar",
  "Galarian Moltres": "moltres-galar",
  "hisuian growlithe": "growlithe-hisui",
  "Hisuian Growlithe": "growlithe-hisui",
  "hisuian arcanine": "arcanine-hisui",
  "Hisuian Arcanine": "arcanine-hisui",
  "hisuian voltorb": "voltorb-hisui",
  "Hisuian Voltorb": "voltorb-hisui",
  "hisuian electrode": "electrode-hisui",
  "Hisuian Electrode": "electrode-hisui",
  "hisuian typhlosion": "typhlosion-hisui",
  "Hisuian Typhlosion": "typhlosion-hisui",
  "hisuian qwilfish": "qwilfish-hisui",
  "Hisuian Qwilfish": "qwilfish-hisui",
  "hisuian sneasel": "sneasel-hisui",
  "Hisuian Sneasel": "sneasel-hisui",
  "hisuian samurott": "samurott-hisui",
  "Hisuian Samurott": "samurott-hisui",
  "hisuian lilligant": "lilligant-hisui",
  "Hisuian Lilligant": "lilligant-hisui",
  "hisuian zorua": "zorua-hisui",
  "Hisuian Zorua": "zorua-hisui",
  "hisuian zoroark": "zoroark-hisui",
  "Hisuian Zoroark": "zoroark-hisui",
  "hisuian braviary": "braviary-hisui",
  "Hisuian Braviary": "braviary-hisui",
  "hisuian sliggoo": "sliggoo-hisui",
  "Hisuian Sliggoo": "sliggoo-hisui",
  "hisuian goodra": "goodra-hisui",
  "Hisuian Goodra": "goodra-hisui",
  "hisuian avalugg": "avalugg-hisui",
  "Hisuian Avalugg": "avalugg-hisui",
  "hisuian decidueye": "decidueye-hisui",
  "Hisuian Decidueye": "decidueye-hisui",
  "paldean tauros": "tauros-paldea-combat-breed",
  "Paldean Tauros": "tauros-paldea-combat-breed",
  "paldean tauros fighting": "tauros-paldea-combat-breed",
  "Paldean Tauros Fighting": "tauros-paldea-combat-breed",
  "fighting tauros": "tauros-paldea-combat-breed",
  "fighting paldean tauros": "tauros-paldea-combat-breed",
  "Fighting Paldean Tauros": "tauros-paldea-combat-breed",
  "Fighting Tauros": "tauros-paldea-combat-breed",
  "combat tauros": "tauros-paldea-combat-breed",
  "Combat Tauros": "tauros-paldea-combat-breed",
  "combat breed tauros": "tauros-paldea-combat-breed",
  "Combat Breed Tauros": "tauros-paldea-combat-breed",
  "paldean tauros fire": "tauros-paldea-blaze-breed",
  "Paldean Tauros Fire": "tauros-paldea-blaze-breed",
  "paldean fire tauros": "tauros-paldea-blaze-breed",
  "Paldean Fire Tauros": "tauros-paldea-blaze-breed",
  "fire tauros": "tauros-paldea-blaze-breed",
  "Fire Tauros": "tauros-paldea-blaze-breed",
  "blaze tauros": "tauros-paldea-blaze-breed",
  "Blaze Tauros": "tauros-paldea-blaze-breed",
  "fire paldean tauros": "tauros-paldea-blaze-breed",
  "Fire Paldean Tauros": "tauros-paldea-blaze-breed",
  "fire breed tauros": "tauros-paldea-blaze-breed",
  "Fire Breed Tauros": "tauros-paldea-blaze-breed",
  "blaze breed tauros": "tauros-paldea-blaze-breed",
  "Blaze Breed Tauros": "tauros-paldea-blaze-breed",
  "paldean tauros water": "tauros-paldea-aqua-breed",
  "Paldean Tauros Water": "tauros-paldea-aqua-breed",
  "paldean water tauros": "tauros-paldea-aqua-breed",
  "Paldean Water Tauros": "tauros-paldea-aqua-breed",
  "water tauros": "tauros-paldea-aqua-breed",
  "Water Tauros": "tauros-paldea-aqua-breed",
  "water paldean tauros": "tauros-paldea-aqua-breed",
  "Water Paldean Tauros": "tauros-paldea-aqua-breed",
  "water breed tauros": "tauros-paldea-aqua-breed",
  "Water Breed Tauros": "tauros-paldea-aqua-breed",
  "aqua breed tauros": "tauros-paldea-aqua-breed",
  "Aqua Breed Tauros": "tauros-paldea-aqua-breed",
  "paldean tauros aqua": "tauros-paldea-aqua-breed",
  "Paldean Tauros Aqua": "tauros-paldea-aqua-breed",
  "paldean aqua tauros": "tauros-paldea-aqua-breed",
  "Paldean Aqua Tauros": "tauros-paldea-aqua-breed",
  "aqua tauros": "tauros-paldea-aqua-breed",
  "Aqua Tauros": "tauros-paldea-aqua-breed",
  "aqua paldean tauros": "tauros-paldea-aqua-breed",
  "Aqua Paldean Tauros": "tauros-paldea-aqua-breed",
  zygarde: "zygarde-50",
  Zygarde: "zygarde-50",
  "zygarde 10": "zygarde-10",
  "Zygarde 10": "zygarde-10",
  "zygarde complete": "zygarde-complete",
  "Zygarde Complete": "zygarde-complete",
  aegislash: "aegislash-shield",
  Aegislash: "aegislash-shield",
  "shield aegislash": "aegislash-shield",
  "Shield Aegislash": "aegislash-shield",
  "aegislash sword": "aegislash-blade",
  "Aegislash Sword": "aegislash-blade",
  "sword aegislash": "aegislash-blade",
  "Sword Aegislash": "aegislash-blade",
  "sunny castform": "castform-sunny",
  "Sunny Castform": "castform-sunny",
  "rainy castform": "castform-rainy",
  "Rainy Castform": "castform-rainy",
  "snowy castform": "castform-snowy",
  "Snowy Castform": "castform-snowy",
  "primal kyogre": "kyogre-primal",
  "Primal Kyogre": "kyogre-primal",
  "primal groudon": "groudon-primal",
  "Primal Groudon": "groudon-primal",
  deoxys: "deoxys-normal",
  "attack deoxys": "deoxys-attack",
  "Attack Deoxys": "deoxys-attack",
  "defense deoxys": "deoxys-defense",
  "Defense Deoxys": "deoxys-defense",
  "defence deoxys": "deoxys-defense",
  "Defence Deoxys": "deoxys-defense",
  "speed deoxys": "deoxys-speed",
  "Speed Deoxys": "deoxys-speed",
  "rotom-w": "rotom-wash",
  "Rotom-W": "rotom-wash",
  "rotom-h": "rotom-heat",
  "Rotom-H": "rotom-heat",
  "rotom-m": "rotom-mow",
  "Rotom-M": "rotom-mow",
  "rotom-f": "rotom-fan",
  "Rotom-F": "rotom-fan",
  "rotom-fr": "rotom-frost",
  "Rotom-Fr": "rotom-frost",
  "origin dialga": "dialga-origin",
  "Origin Dialga": "dialga-origin",
  "origin palkia": "palkia-origin",
  "Origin Palkia": "palkia-origin",
  "origin giratina": "giratina-origin",
  "Origin Giratina": "giratina-origin",
  giratina: "giratina-altered",
  shaymin: "shaymin-land",
  "shaymin sky": "shaymin-sky",
  "Shaymin Sky": "shaymin-sky",
  "shaymin s": "shaymin-sky",
  "Shaymin S": "shaymin-sky",
  basculegion: "basculegion-female",
  "basculegion-f": "basculegion-female",
  "female basculegion": "basculegion-female",
  "male basculegion": "basculegion-male",
  "basculegion m": "basculegion-male",
  basculin: "basculin-red-striped",
  landorus: "landorus-incarnate",
  "lando-t": "landorus-therian",
  "landorus t": "landorus-therian",
  thundurus: "thundurus-incarnate",
  "thundurus-t": "thundurus-therian",
  tornadus: "tornadus-incarnate",
  "tornadus-t": "tornadus-therian",
  enamorus: "enamorus-incarnate",
  "enamorus-t": "enamorus-therian",
  keldeo: "keldeo-ordinary",
  "keldeo-r": "keldeo-resolute",
  "resolute keldeo": "keldeo-resolute",
  "Resolute Keldeo": "keldeo-resolute",
  meloetta: "meloetta-aria",
  "meloetta-p": "meloetta-pirouette",
  "ash greninja": "greninja-ash",
  "Ash Greninja": "greninja-ash",
  meowstic: "meowstic-female",
  "meowstic-f": "meowstic-female",
  "Meowstic-F": "meowstic-female",
  "f-meowstic": "meowstic-female",
  "F-Meowstic": "meowstic-female",
  "meowstic-m": "meowstic-male",
  "Meowstic-M": "meowstic-male",
  "m-meowstic": "meowstic-male",
  "M-Meowstic": "meowstic-male",
  pumpkaboo: "pumpkaboo-small",
  "pumpkaboo-medium": "pumpkaboo-average",
  "Pumpkaboo-Medium": "pumpkaboo-average",
  "pumpkaboo-m": "pumpkaboo-average",
  "Pumpkaboo-M": "pumpkaboo-average",
  "pumpkaboo-med": "pumpkaboo-average",
  "pumpkaboo-Med": "pumpkaboo-average",
  "pumpkaboo-l": "pumpkaboo-large",
  "pumpkaboo-xl": "pumpkaboo-super",
  gourgeist: "gourgeist-small",
  "gourgeist-m": "gourgeist-average",
  "Gourgeist-M": "gourgeist-average",
  "gourgeist-med": "gourgeist-average",
  "Gourgeist-Med": "gourgeist-average",
  "gourgeist-medium": "gourgeist-average",
  "Gourgeist-Medium": "gourgeist-average",
  "gourgeist-l": "gourgeist-large",
  "gourgeist-xl": "gourgeist-super",
  oricorio: "oricorio-baile",
  "oricorio-pompom": "oricorio-pom-pom",
  "oricorio-p": "oricorio-pom-pom",
  "oricorio p'au": "oricorio-pau",
  "oricorio-s": "oricorio-sensu",
  lycanroc: "lycanroc-midday",
  "lycanroc-m": "lycanroc-midnight",
  "lycanroc-d": "lycanroc-dusk",
  "necrozma-dm": "necrozma-dusk",
  "necrozma-dusk-mane": "necrozma-dusk",
  "necrozma-dawn-wings": "necrozma-dawn",
  "necrozma-dw": "necrozma-dawn",
  "ultra necrozma": "necrozma-ultra",
  "Ultra Necrozma": "necrozma-ultra",
  mimikyu: "mimikyu-disguised",
  toxtricity: "toxtricity-amped",
  eiscue: "eiscue-ice",
  "eiscue-n": "eiscue-noice",
  indeedee: "indeedee-female",
  "indeedee f": "indeedee-female",
  "f indeedee": "indeedee-female",
  "female indeedee": "indeedee-female",
  "male indeedee": "indeedee-male",
  "indeedee m": "indeedee-male",
  morpeko: "morpeko-full-belly",
  eternamax: "eternatus-eternamax",
  urshifu: "urshifu-single-strike",
  "urshifu-r": "urshifu-rapid-strike",
  "urshifu-rapid": "urshifu-rapid-strike",
  "calyrex-s": "calyrex-shadow",
  "calyrex-i": "calyrex-ice",
  "ursaluna-bm": "ursaluna-bloodmoon",
  "ursaluna blood moon": "ursaluna-bloodmoon",
  "blood moon ursaluna": "ursaluna-bloodmoon",
  oinkologne: "oinkologne-female",
  "oinkologne-f": "oinkologne-female",
  "f oinkologne": "oinkologne-female",
  "female oinkologne": "oinkologne-female",
  "oinkologne-m": "oinkologne-male",
  "m oinkologne": "oinkologne-male",
  "male oinkologne": "oinkologne-male",
  maushold: "maushold-family-of-four",
  squawkabilly: "squawkabilly-green-plumage",
  palafin: "palafin-zero",
  "palafin h": "palafin-hero",
  tatsugiri: "tatsugiri-curly",
  dudunsparce: "dudunsparce-two-segment",
  "gimmighoul r": "gimmighoul-roaming",
  "ogerpon-w": "ogerpon-wellspring-mask",
  "ogerpon-wellspring": "ogerpon-wellspring-mask",
  "ogerpon-water": "ogerpon-wellspring-mask",
  "ogerpon-h": "ogerpon-hearthflame-mask",
  "ogerpon-hearthflame": "ogerpon-hearthflame-mask",
  "ogerpon fire": "ogerpon-hearthflame-mask",
  "ogerpon-c": "ogerpon-cornerstone-mask",
  "ogerpon-r": "ogerpon-cornerstone-mask",
  "ogerpon-cornerstone": "ogerpon-cornerstone-mask",
  "ogerpon-rock": "ogerpon-cornerstone-mask",
  "terapagos-t": "terapagos-terastal",
  "terapagos-s": "terapagos-stellar",
};

// Data fetching area (no changes here)
export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  let pokemonQuery = "";
  let pokemon = [];

  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    pokemonQuery = searchParams.get("pokemon")?.trim() ?? "";

    if (!pokemonQuery) {
      return { pokemon: [] };
    }

    const normalizeName = (name: string) => {
      return name.trim().toLowerCase().replace(/\s+/g, "-");
    };

    const normalizedInput = normalizeName(pokemonQuery);
    const apiFriendlyName =
      pokemonNameMap[pokemonQuery] ||
      pokemonNameMap[normalizedInput] ||
      normalizedInput;

    console.log("Mapped API name:", apiFriendlyName);

    const result1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${apiFriendlyName}`
    );

    if (!result1.ok) {
      console.error("Pokemon not found:", result1.statusText);
      return { pokemon: [] };
    }

    const result1Json = await result1.json();
    console.log("Fetched Pokémon data:", result1Json);

    const types = result1Json.types
      .map((type: any) => type.type.name)
      .join(", ");
    const stats = result1Json.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));

    pokemon = [
      {
        name: result1Json.name,
        sprite: result1Json.sprites.front_default,
        types: types,
        stats: stats,
      },
    ];
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    pokemon = [];
  }

  return {
    pokemon: pokemon.filter((p) =>
      p.name.toLowerCase().includes(pokemonQuery.toLowerCase())
    ),
  };
}

export default function PokemonInfoPage() {
  const { pokemon } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const [spriteUrl, setSpriteUrl] = useState<string>(pokeBall); // Initialize with pokeBall
  const [types, setTypes] = useState<string>("");
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);
  const [searchValue, setSearchValue] = useState(""); // State for the search field

  useEffect(() => {
    if (pokemon.length > 0) {
      // Always update spriteUrl when Pokémon data is available
      setSpriteUrl(pokemon[0].sprite || pokeBall); // Will use pokeBall as fallback if no sprite
      setTypes(pokemon[0].types);
      setStats(pokemon[0].stats);
    }
  }, [pokemon]);

  // Capitalize the first letter of each word and replace hyphens with spaces
  const capitalize = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const normalizeName = (name) => {
    return name.trim().toLowerCase().replace(/\s+/g, "-");
  };

  const getApiFriendlyName = (input) => {
    const normalizedInput = normalizeName(input);
    return (
      pokemonNameMap[input] ||
      pokemonNameMap[normalizedInput] ||
      normalizedInput
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const apiFriendlyName = getApiFriendlyName(searchValue);
      navigate(`/?pokemon=${encodeURIComponent(apiFriendlyName)}`);
      setSearchValue("");
    }
  };

  const getBarColor = (statName: string) => {
    switch (statName) {
      case "hp":
        return "bg-green-500";
      case "attack":
        return "bg-red-500";
      case "defense":
        return "bg-blue-500";
      case "speed":
        return "bg-yellow-500";
      case "special-attack":
        return "bg-purple-500";
      case "special-defense":
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-secondary p-4 h-screen flex flex-col items-center justify-center">
      <h1 className="text-center text-xl mb-4">Enter the name of a Pokémon!</h1>
      <h3>Supports regional forms, megas, and more!</h3>
      <Form className="text-lg grid mx-[30%]" method="get">
        <input
          className="rounded border-2 border-double border-black m-1 indent-1"
          type="text"
          name="pokemon"
          id="searchField"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Form>

      <div className="flex justify-center mt-4">
        <div className="md:w-[400px] md:h-[400px] max-w-[40%] flex flex-col items-center justify-center border-double rounded border-2 bg-cardstock border-black ml-4">
          <img
            className="h-[250px] max-w-full object-contain"
            src={spriteUrl} // Always use spriteUrl (which is set to pokeBall by default)
            alt="This is where the sprite renders!"
          />
          <h2 className="text-lg mt-2">
            {capitalize(pokemon[0]?.name || "Unknown Pokémon")}
          </h2>
          <p className="text-md">
            {types ? `Types: ${types}` : "No types available"}
          </p>
        </div>
        <div className="md:w-[400px] md:h-[400px] max-w-[40%] flex flex-col items-center justify-center border-double rounded border-2 bg-cardstock border-black ml-4">
          {stats.length > 0 ? (
            stats.map((stat) => (
              <div key={stat.name} className="stat-bar mb-2">
                <span className="stat-bar-label block text-left mb-1">
                  {stat.name}
                </span>
                <div className="stat-bar-value-container">
                  <div
                    className={`stat-bar-value ${getBarColor(stat.name)}`}
                    style={{
                      width: `${(stat.value / 255) * 100}%`,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No stats available</p>
          )}
        </div>
      </div>
    </div>
  );
}
