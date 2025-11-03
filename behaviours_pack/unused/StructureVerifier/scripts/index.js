import { world, system } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe(ev => {
  if (ev.id == "eko:VerifyStructure") {
    verifyStructure();
    world.sendMessage("Vérification de la structure lancée !");
  }
});
const checkers = [
        { tag: "temp_checker", prefix: "degre_", label: "Température", unit: "C°" },
        { tag: "energy_checker", prefix: "energie_", label: "Énergie", unit: "Wh" },
        { tag: "water_checker", prefix: "eau_", label: "Eau perdue", unit: "L" } // unité à ajuster
    ];
world.beforeEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  

  if (event.itemStack && event.itemStack.typeId === "minecraft:fishing_rod") {
    event.cancel = true;

    system.run(() => {
      verifyChests(player);
    });
  }
  else if (item && item.typeId === "operation_future_durable:thermometre") {
    event.cancel = true;

    system.run(() => {
       showRoomData(player,checkers[0]);
    });
  }
  else if (item && item.typeId === "operation_future_durable:multimetre") {
    event.cancel = true;

    system.run(() => {
      showRoomData(player,checkers[1]);
    });
  }
  else if (item && item.typeId === "operation_future_durable:compteur_eau") {
    event.cancel = true;

    system.run(() => {
      showRoomData(player,checkers[2]);
    });
  }
});

function verifyStructure() {
  const dim = world.getDimension("overworld");
  const stands = dim.getEntities({ type: "minecraft:armor_stand", tags: ["checker"] });

  if (stands.length === 0) {
    world.sendMessage("/say Aucun armor stand 'checker' trouvé !");
    return;
  }

  const origin = stands[0].location;
  let allGood = true;

  for (let x = 0; x < 22; x++) {
    for (let y = 0; y < 29; y++) {
      for (let z = 0; z < 6; z++) {
        const posA = { x: Math.floor(origin.x) + x, y: Math.floor(origin.y) +38+ y, z: Math.floor(origin.z) + z };
        const posB = { x: Math.floor(origin.x) + x, y: Math.floor(origin.y)  + y, z: Math.floor(origin.z) + z };

        const blockA = dim.getBlock(posA);
        const blockB = dim.getBlock(posB);

        if (!blockA || !blockB) continue;

        if (blockA.typeId !== blockB.typeId) {
          if (blockA.typeId === "minecraft:air") {
            dim.getBlock(posA).setType("minecraft:lapis_block");
          }
          else if (blockB.typeId === "minecraft:air") {
            dim.getBlock(posA).setType("minecraft:emerald_block");
          }
          else {
            
            dim.getBlock(posA).setType("minecraft:redstone_block");
          }
          allGood = false;
        }
      }
    }
  }

  if (allGood) {
    world.sendMessage(" Structure correcte !");
    system.runTimeout(async () => {
        await world.getDimension("overworld").runCommandAsync(
          `scriptevent eko:s_2_4_2`
        );
      }, 50);
  } else {
    world.sendMessage("Structure incorrecte !");
  }
}
function verifyChests(player) {
  const dim = world.getDimension("overworld");

  // 📌 Définir les coffres + leurs contenus attendus
  const checks = [
    {
      name: "Coffre Eau",
      pos: { x: 956, y: -6, z: 928 },
      expected: [
        { typeId: "operation_future_durable:eau", amount: 120, here: false },
      ],
    },
    {
      name: "Coffre Fruits et Legumes",
      pos: { x: 956, y: -5, z: 928 },
      expected: [
        { typeId: "minecraft:apple", amount: 30, here: false },
        { typeId: "minecraft:carrot", amount: 30, here: false },
        { typeId: "operation_future_durable:aubergine", amount: 30, here: false },
        { typeId: "operation_future_durable:banane", amount: 30, here: false },
        { typeId: "operation_future_durable:poire", amount: 30, here: false },
         { typeId: "operation_future_durable:poivron", amount: 30, here: false },
      ],
    },
    {
      name: "Coffre Féculents",
      pos: { x: 956, y: -4, z: 928 },
      expected: [
        { typeId: "minecraft:bread", amount: 20, here: false },
        { typeId: "minecraft:potato", amount: 20, here: false },
        { typeId: "operation_future_durable:pate", amount: 20, here: false },
        { typeId: "operation_future_durable:riz", amount: 20, here: false },
      ],
    },
    {
      name: "Coffre produit laitier",
      pos: { x: 956, y: -3, z: 928 },
      expected: [
        { typeId: "operation_future_durable:lait", amount: 20, here: false },
        { typeId: "operation_future_durable:fromage", amount: 20, here: false },
        { typeId: "operation_future_durable:yaourt", amount: 20, here: false },
      ],
    },
    {
      name: "Coffre Viandes",
      pos: { x: 956, y: -3, z: 924 },
      expected: [
        { typeId: "minecraft:beef", amount: 20, here: false },
        { typeId: "minecraft:chicken", amount: 20, here: false },
        { typeId: "operation_future_durable:oeuf", amount: 20, here: false },
        { typeId: "minecraft:salmon", amount: 20, here: false },
      ],
    },
    {
      name: "Coffre matiere grasse",
      pos: { x: 956, y: -2, z: 928 },
      expected: [
        { typeId: "operation_future_durable:huile_olive", amount: 10, here: false },
      ],
    },
  ]

  let allGood = true;

  for (const check of checks) {
    const block = dim.getBlock(check.pos);

    if (!block || block.typeId !== "minecraft:chest") {
      player.runCommand(`/say ❌ ${check.name} manquant à ${JSON.stringify(check.pos)} !`);
      allGood = false;
      continue;
    }

    const inventory = block.getComponent("minecraft:inventory");
    if (!inventory) {
      player.runCommand(`/say ❌ ${check.name} n'a pas d'inventaire !`);
      allGood = false;
      continue;
    }

    const container = inventory.container;

    // Remettre tous les `here` à false au cas où
    check.expected.forEach(exp => exp.here = false);

    const counts = {};
for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
  const item = container.getItem(slotIndex);
  if (!item) continue;
  counts[item.typeId] = (counts[item.typeId] || 0) + item.amount;
}

// Vérifier par rapport aux attendus
let chestGood = true;
for (const exp of check.expected) {
  const actual = counts[exp.typeId] || 0;
  if (actual !== exp.amount) {
    chestGood = false;
    world.sendMessage(
      `DEBUG: ${check.name} attendait ${exp.amount} ${exp.typeId}, trouvé ${actual}`
    );
  }
}

// Vérifier qu'il n'y a pas d'intrus
for (const typeId in counts) {
  if (!check.expected.some(exp => exp.typeId === typeId)) {
    chestGood = false;
    world.sendMessage(`DEBUG: ${check.name} contient un item inattendu : ${typeId} x${counts[typeId]}`);
  }
}

if (chestGood) {
  player.runCommand(`/say ✅ ${check.name} correct !`);
} else {
  player.runCommand(`/say ❌ ${check.name} incorrect !`);
  allGood = false;
}
}
}

function showRoomData(player, checker) {
    const dim = world.getDimension("overworld");

    const nearbyStands = dim.getEntities({
        location: player.location,
        maxDistance: 4,
        type: "operation_future_durable:marker",
        tags: [checker.tag]
    });

    if (nearbyStands.length === 0) {
        player.runCommand(`say Aucune donnée ici.`);
        return;
    }

    const stand = nearbyStands[0];

    // Tag contextuel
    const contextTags = ["fenetre", "lampe", "electromenager", "evier", "toit", "television"];
    const contextTag = stand.getTags().find(t => contextTags.includes(t));

    // Message narratif
    if (contextTag) {
        switch (contextTag) {
            case "fenetre":
                player.runCommand(`say Il fait froid près de la fenêtre. Pense à vérifier l'isolation !`);
                break;
            case "lampe":
                player.runCommand(`say La lampe est allumée en permanence, attention à l'énergie !`);
                break;
            case "electromenager":
                player.runCommand(`say Il est important de regarder à la consommation des vieux appareils, ce four ancien consomme beaucoup trop !`);
                break;
            case "evier":
                player.runCommand(`say L'évier est ouvert, de l'eau est perdue !`);
                break;
            case "toit":
                player.runCommand(`say Il fait chaud près du toit, attention à la chaleur !`);
                break;
            case "television":
                player.runCommand(`say La télévision et les consoles de jeux consomment de l'énergie, même en veille, pense à l'éteindre !`);
                break;
            default:
                player.runCommand(`say Il y a un objet détecté.`);
        }
    } else {
        player.runCommand(`say Aucun objet spécifique détecté.`);
    }
    system.runTimeout(async () => {
            await dim.runCommandAsync(`scriptevent eko:a_2_${contextTag}`); 
          }, 10);
    world.sendMessage(`scriptevent eko:a_2_${contextTag}`);
  
}



function showRoomTemperature(player) {
  const dim = world.getDimension("overworld");

  // Chercher l'armor stand le plus proche avec le tag "temp_checker"
  const nearbyStands = dim.getEntities({
    location: player.location,
    maxDistance: 5,
    type: "minecraft:armor_stand",
    tags: ["temp_checker"]
  });

  if (nearbyStands.length === 0) {
    player.runCommand(`say Aucune donnée de température ici.`);
    return;
  }

  const stand = nearbyStands[0]; // Le plus proche

  // Rechercher un tag du type "temp:30degres"
  const tempTag = stand.getTags().find(tag => tag.startsWith("temp:"));
  if (tempTag) {
    const temperature = tempTag.substring("temp:".length);
    player.runCommand(`say Température : ${temperature} C°`);
  } else {
    player.runCommand(`say Ce stand ne contient pas de température.`);
  }
}
function showRoomEnergy(player) {
  const dim = world.getDimension("overworld");

  // Chercher l'armor stand le plus proche avec le tag "temp_checker"
  const nearbyStands = dim.getEntities({
    location: player.location,
    maxDistance: 5,
    type: "minecraft:armor_stand",
    tags: ["energy_checker"]
  });

  if (nearbyStands.length === 0) {
    player.runCommand(`say Aucune donnée d'énergie ici.`);
    return;
  }

  const stand = nearbyStands[0]; // Le plus proche

  // Rechercher un tag du type "energie:30degres"
  const energieTag = stand.getTags().find(tag => tag.startsWith("energie:"));
  if (energieTag) {
    const energy = energieTag.substring("energie:".length);
    player.runCommand(`say Énergie : ${energy}`);
  } else {
    player.runCommand(`say Ce stand ne contient pas de données d'énergie.`);
  }
}