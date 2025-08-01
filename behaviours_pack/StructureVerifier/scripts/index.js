import { world, system } from "@minecraft/server";

world.beforeEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

    // ✅ Vérifier le tag du joueur
  if (!player.getTags().includes("canVerify")) {
    return; // Pas autorisé
  }

  if (event.itemStack && event.itemStack.typeId === "minecraft:fishing_rod") {
    event.cancel = true;

    system.run(() => {
      verifyStructure(player);
      verifyChests(player);
    });
  }
  else if (item && item.typeId === "minecraft:stick") {
    event.cancel = true;

    system.run(() => {
      showRoomTemperature(player);
    });
  }
  else if (item && item.typeId === "minecraft:compass") {
    event.cancel = true;

    system.run(() => {
      showRoomEnergy(player);
    });
  }
});

function verifyStructure(player) {
  const dim = world.getDimension("overworld");
  const stands = dim.getEntities({ type: "minecraft:armor_stand", tags: ["checker"] });

  if (stands.length === 0) {
    player.runCommand("/say ❌ Aucun armor stand 'checker' trouvé !");
    return;
  }

  const origin = stands[0].location;
  let allGood = true;

  for (let x = 0; x < 22; x++) {
    for (let y = 0; y < 29; y++) {
      for (let z = 0; z < 6; z++) {
        const posA = { x: Math.floor(origin.x) + x, y: Math.floor(origin.y) + y, z: Math.floor(origin.z) + z };
        const posB = { x: Math.floor(origin.x) + 100 + x, y: Math.floor(origin.y) + y, z: Math.floor(origin.z) + z };

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
    player.runCommand("/say Structure correcte !");
  } else {
    player.runCommand("/say Structure incorrecte !");
  }
}
function verifyChests(player) {
  const dim = world.getDimension("overworld");

  // 📌 Définir les coffres + leurs contenus attendus
  const checks = [
    {
      name: "Coffre Fruits",
      pos: { x: 10, y: -60, z: 0 },
      expected: [
        { typeId: "minecraft:apple", amount: 64, here: false },
        { typeId: "minecraft:melon_block", amount: 64, here: false },
      ],
    },
    {
      name: "Coffre Légumes",
      pos: { x: 13, y: -60, z: 0 },
      expected: [
        { typeId: "minecraft:carrot", amount: 64, here: false },
        { typeId: "minecraft:potato", amount: 64, here: false },
      ],
    },
    {
      name: "Coffre Viandes",
      pos: { x: 16, y: -60, z: 0 },
      expected: [
        { typeId: "minecraft:beef", amount: 64, here: false },
        { typeId: "minecraft:chicken", amount: 64, here: false },
      ],
    }
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

    let chestGood = true;

    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex); 
      if (!item) continue;

      let matched = false;

      for (const exp of check.expected) {
        if (item.typeId === exp.typeId && item.amount === exp.amount && !exp.here) {
          exp.amount -= item.amount; // Décrémenter la quantité attendue
          if (exp.amount === 0) {
            exp.here = true; // Marquer comme trouvé
          }
          matched = true;
          break;
        }
      }

      if (!matched) {
        chestGood = false; // Un item non prévu trouvé
        break;
      }
    }

    // Vérifier que tous les attendus sont là
    for (const exp of check.expected) {
      if (!exp.here) {
        chestGood = false;
        break;
      }
    }

    if (chestGood) {
      player.runCommand(`/say ✅ ${check.name} correct !`);
    } else {
      player.runCommand(`/say ❌ ${check.name} incorrect !`);
      allGood = false;
    }
  }

  if (allGood) {
    player.runCommand("/say ✅ Tous les coffres sont corrects !");
  } else {
    player.runCommand("/say ❌ Des coffres sont incorrects !");
  }
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