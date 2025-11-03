import { system, world, ItemStack } from "@minecraft/server";

// Message au lancement

world.sendMessage("[DEBUG] Script chargé ! (30/10/2025)");
let DEBUG = false;
const playersReady = new Set();


// Garde les differents scores des scoreboards
const progres = world.scoreboard.getObjective("progres");
const maison_total = world.scoreboard.getObjective("maison_total");
const DEBUG_score = world.scoreboard.getObjective("DEBUG");

const cinematic = {
  "futur_1": {
    area: [
      { x: 1151, y: -14, z: -471 },
      { x: 711, y: 108, z: 264 }
    ],
    path: [
      { x: 1144, y: 55, z: -62, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 1077, y: 64, z: -213, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "futur_2": {
    area: [
      { x: 2151, y: -14, z: -471 },
      { x: 1711, y: 108, z: 264 }
    ],
    path: [
      { x: 2144, y: 55, z: -62, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 2077, y: 64, z: -213, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "futur_3": {
    area: [
      { x: 2151, y: -14, z: 529 },
      { x: 1711, y: 108, z: 1264 }
    ],
    path: [
      { x: 2144, y: 55, z: 938, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 2077, y: 64, z: 787, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "futur_4": {
    area: [
      { x: 1151, y: -14, z: 529 },
      { x: 711, y: 108, z: 1264 }
    ],
    path: [
      { x: 1144, y: 55, z: 938, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 1077, y: 64, z: 787, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "futur_5": {
    area: [
      { x: 151, y: -14, z: 529 },
      { x: -289, y: 108, z: 1264 }
    ],
    path: [
      { x: 144, y: 55, z: 938, rot: { x: 0.7, y: 61.6 }, speed: 2 },

      { x: 46, y: 39, z: 759, rot: { x: 17, y: 95 }, speed: 20 },
      { x: -56, y: 13, z: 726, rot: { x: 7, y: 121 }, speed: 10 },
      { x: -139, y: 41, z: 815, rot: { x: 18, y: -42 }, speed: 20 },
      { x: -41, y: -3.5, z: 1000, rot: { x: 3.8, y: -90 }, speed: 16 },
      { x: 55, y: -2.5, z: 1000, rot: { x: -3, y: -31 }, speed: 8 },
      { x: 74.5, y: 20, z: 1063, rot: { x: 8, y: 62 }, speed: 8 },
      { x: 64.5, y: 60, z: 1191, rot: { x: 8, y: 162 }, speed: 8 },
      { x: 64.5, y: 61, z: 1192, rot: { x: 8, y: 162 }, speed: 5 }

    ]
  },
  "present_1": {
    area: [
      { x: 1151, y: -14, z: 1529 },
      { x: 711, y: 108, z: 2264 }
    ],
    path: [
      { x: 1144, y: 55, z: 1938, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 1077, y: 64, z: 1787, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "water_cleaning": {
    area: [
      { x: 900, y: 0, z: 1600 },
      { x: 1000, y: 30, z: 1800 }
    ],
    path: [
      { x: 911, y: 17, z: 1700, rot: { x: 18.3, y: 120 }, speed: 2 },
      { x: 911.5, y: 17.5, z: 1700.5, rot: { x: 18.3, y: 120 }, speed: 8 }
    ]
  },
}

// Differents chemins pour Eko
const paths = {
  "s_1_1_1": [true, { x: 116.5, y: -2, z: 1785.5, speed: 0.1 }],
  "s_1_2_1": [true,
    { x: 116.5, y: -2, z: 1785.5, speed: 0.1 },
    { x: 118.5, y: -2, z: 1785.5, speed: 0.1 },
    { x: 120.5, y: -2, z: 1787.5, speed: 0.1 }
  ],
  "s_1_3_1": [false, { x: 215.5, y: -12, z: 1715.5, speed: 0.1 }],
  "s_1_4_1": [true, { x: 223.5, y: -10, z: 1719.5, speed: 0.1 },

  ],

  "s_1_5_1": [true,
    { x: 223.5, y: -10, z: 1719.5, speed: 0.1 },
    { x: 221.5, y: -10, z: 1721.5, speed: 0.1 }
  ],
  "s_1_6_1": [true,
    { x: 221, y: -10, z: 1721.5, speed: 0.1 },
    { x: 223.5, y: -10, z: 1719.5, speed: 0.1 },
    { x: 225.5, y: -10, z: 1721.5, speed: 0.1 }
  ],
  "s_1_7_1": [true,
    { x: 223.5, y: -10, z: 1719.5, speed: 0.075 },
    { x: 223.5, y: -10, z: 1714.5, speed: 0.075 },
    { x: 227.5, y: -10, z: 1714.5, speed: 0.075 },
    { x: 227.5, y: -10, z: 1711.5, speed: 0.075 }
  ],
  "s_1_8_1": [true,
    { x: 227.5, y: -10, z: 1711.5, speed: 0.09 },
    { x: 225.5, y: -9, z: 1711.5, speed: 0.09 },
    { x: 224, y: -10, z: 1711.5, speed: 0.09 },
    { x: 222.5, y: -9, z: 1711.5, speed: 0.09 },
    { x: 219.5, y: -10, z: 1711.5, speed: 0.09 },
  ],
  "s_1_9_1": [false, { x: 215.5, y: -12, z: 1715.5, speed: 0.1 }],
  "s_1_10_1": [false, { x: 957.5, y: -7, z: 52.5, speed: 0.1 }],
  "s_2_1_1": [true,
    { x: 960.5, y: -7, z: 54.5, speed: 0.2 },
    { x: 1010.5, y: -7, z: 59.5, speed: 0.2 },
    { x: 1010.5, y: -5, z: 87.5, speed: 0.2 },
  ],
  "s_2_2_1": [false, { x: 1010.5, y: -5, z: 2082.5, speed: 0.1 }],
  "s_2_3_1": [false, { x: 995, y: -5, z: 2171, speed: 0.1 }],
  "s_2_4_1": [false, { x: 995, y: -5, z: 2171, speed: 0.1 }],
  "s_2_5_1": [false, { x: 995, y: -5, z: 2171, speed: 0.1 }],
  "s_2_6_1": [true, { x: 2008, y: -7, z: 60, speed: 0.2 },
    { x: 2054, y: -7, z: 54, speed: 0.2 },
    { x: 2054, y: -7, z: -54, speed: 0.2 },
    { x: 2043, y: -6, z: -65, speed: 0.2 }
  ],
  "s_3_1_1": [false, { x: 1040, y: -6, z: 1937, speed: 0.1 }],
  "s_3_5_1": [true,
    { x: 2051, y: -7, z: 941, speed: 0.2 },
    { x: 2020, y: -7, z: 941, speed: 0.2 },
    { x: 2004, y: -7, z: 909, speed: 0.2 },
    { x: 2003, y: -8, z: 902, speed: 0.2 }

  ],
  "s_3_6_1": [false, { x: 2002, y: -9, z: 895, speed: 0.2 }],
  "s_3_7_1": [true, { x: 904.5, y: 8, z: 1706.5, speed: 0.2 },
    { x: 897.5, y: 8, z: 1706.5, speed: 0.2 },
    { x: 881.5, y: 17, z: 1706.5, speed: 0.2 },
    { x: 880, y: 20, z: 1700, speed: 0.2 },
    { x: 874.5, y: 20, z: 1694.5, speed: 0.2 },
    { x: 874.5, y: 18, z: 1696.5, speed: 0.2 },
    { x: 876.5, y: 16, z: 1696.5, speed: 0.2 },
    { x: 876.5, y: 14, z: 1694.5, speed: 0.2 },
    { x: 874.5, y: 12, z: 1694.5, speed: 0.2 },
    { x: 874.5, y: 10, z: 1696.5, speed: 0.2 },
    { x: 879.5, y: 4, z: 1696.5, speed: 0.2 },
    { x: 885, y: 4, z: 1695, speed: 0.2 }
  ],
  "s_4_1_1": [true, { x: 885, y: 4, z: 1695, speed: 0.2 },
    { x: 885, y: 4, z: 1689, speed: 0.2 },
    { x: 866, y: 4, z: 1669, speed: 0.2 }
  ],
  "s_4_2_1": [true, { x: 866, y: 4, z: 1669, speed: 0.3 },
    { x: 886.5, y: 4, z: 1694.5, speed: 0.15 },
    { x: 876.5, y: 4, z: 1694.5, speed: 0.2 },
    { x: 874.5, y: 2.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: 0.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -1.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -3.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: -5.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: -7.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -10, z: 1696.5, speed: 0.3 },
    { x: 886.5, y: -10, z: 1695.5, speed: 0.3 },
    { x: 870.5, y: -10, z: 1667.5, speed: 0.3 },
  ],
  "s_4_3_1": [true, { x: 1866, y: 4, z: 669, speed: 0.3 },
    { x: 1886.5, y: 4, z: 694.5, speed: 0.15 },
    { x: 1876.5, y: 4, z: 694.5, speed: 0.2 },
    { x: 1874.5, y: 2.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: 0.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -1.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -3.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: -5.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: -7.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -10, z: 696.5, speed: 0.3 },
    { x: 1886.5, y: -10, z: 695.5, speed: 0.3 },
    { x: 1870.5, y: -10, z: 667.5, speed: 0.3 },
  ],

  "s_4_4_1": [true, { x: 870.5, y: -10, z: 1667.5, speed: 0.3 },
    { x: 886.5, y: -10, z: 1694.5, speed: 0.15 },
    { x: 876.5, y: -10, z: 1694.5, speed: 0.2 },
    { x: 874.5, y: -11.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: -13.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -15.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -17.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: -19.5, z: 1694.5, speed: 0.3 },
    { x: 874.5, y: -21.5, z: 1696.5, speed: 0.3 },
    { x: 876.5, y: -24, z: 1696.5, speed: 0.3 },
    { x: 886.5, y: -24, z: 1695.5, speed: 0.3 },
    { x: 877.5, y: -24, z: 1674.5, speed: 0.3 },
  ],
  "s_4_5_1": [true, { x: 1870.5, y: -10, z: 667.5, speed: 0.3 },
    { x: 1886.5, y: -10, z: 694.5, speed: 0.15 },
    { x: 1876.5, y: -10, z: 694.5, speed: 0.2 },
    { x: 1874.5, y: -10.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: -12.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -14.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -16.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: -18.5, z: 694.5, speed: 0.3 },
    { x: 1874.5, y: -20.5, z: 696.5, speed: 0.3 },
    { x: 1876.5, y: -24, z: 696.5, speed: 0.3 },
    { x: 1886.5, y: -24, z: 695.5, speed: 0.3 },
    { x: 1877.5, y: -24, z: 674.5, speed: 0.3 },
  ],
  "s_4_6_1": [false, { x: 890, y: -20, z: 1680, speed: 0.3 },
    { x: 910, y: 30, z: 1710, speed: 0.3 }
  ],
  "s_4_7_1": [false, { x: 900, y: -20, z: 890, speed: 0.3 },
    { x: 1010, y: 30, z: 950, speed: 0.3 }
  ],

  "s_4_8_1": [true, { x: 1000.5, y: -8, z: 900.5, speed: 0.3 },
    { x: 992.5, y: -7, z: 910.5, speed: 0.2 },
    { x: 980.5, y: -7, z: 932.5, speed: 0.3 },
    { x: 978.5, y: -6, z: 934.5, speed: 0.3 },
    { x: 974.5, y: -6, z: 937.5, speed: 0.3 },
    { x: 969.5, y: -6, z: 935.5, speed: 0.3 },
    { x: 964.5, y: -6, z: 921.5, speed: 0.3 }],
  "s_5_1_1": [false, { x: 950, y: -30, z: 920, speed: 0.3 },
    { x: 970, y: 30, z: 930, speed: 0.3 }],
  "s_5_2_1": [false, { x: 950, y: -30, z: 920, speed: 0.3 },
    { x: 970, y: 30, z: 930, speed: 0.3 }]
};

const checkers = [
  { tag: "temp_checker", prefix: "degre_", label: "Température", unit: "C°" },
  { tag: "energy_checker", prefix: "energie_", label: "Énergie", unit: "Wh" },
  { tag: "water_checker", prefix: "eau_", label: "Eau perdue", unit: "L" } // unité à ajuster
];

let activeEko = new Set();

const overworld = world.getDimension("overworld");
const players = world.getPlayers();

function decorator(message, type = 0) {
  if (type === 0) {
    world.sendMessage(message);
  }
  if (DEBUG === true) {
    if (type === 1) {
      world.sendMessage("§o§n[DEBUG] " + message);
    }
  }


}

function followPath(sceneName) {
  decorator(`Activation du chemin ${sceneName}`, 1);
  for (const eko of overworld.getEntities({
    type: "operation_future_durable:eko",
    tags: [sceneName]
  })) {
    eko.setDynamicProperty("path_name", sceneName);
    eko.setDynamicProperty("path_index", 1);
    activeEko.add(eko.id);
  }
}
function safeClone(src1, src2, dest, delay = 200, limit = 4) {
  const overworld = world.getDimension("overworld");
  if (limit <= 0) {
    decorator("Erreur clone: chunks pas prêts après plusieurs essais.", 1);
    return;
  }
  system.runTimeout(() => {
    const testBlock = overworld.getBlock(src1);
    if (!testBlock) {
      decorator("Chunks pas prêts, retry...", 1);
      safeClone(src1, src2, dest, delay, limit - 1); // réessaie
      return;
    }

    const cmd = `clone ${src1.x} ${src1.y} ${src1.z} ${src2.x} ${src2.y} ${src2.z} ${dest.x} ${dest.y} ${dest.z} replace`;
    overworld.runCommandAsync(cmd).then(res => {
      decorator("Clone ok: " + JSON.stringify(res), 1);
    }).catch(err => {
      decorator("Erreur clone: " + err, 1);
    });
  }, delay);
}

function tpPlayersDispersed(center, direction = 0, delay = 2, spacing = 2) {
  const players = world.getPlayers();
  const dirRad = (direction * Math.PI) / 180;
  const dx = Math.cos(dirRad);
  const dz = Math.sin(dirRad);
  const middle = (players.length - 1) / 2;

  players.forEach((p, i) => {
    const offset = (i - middle) * spacing;
    const x = center.x + dx * offset;
    const z = center.z + dz * offset;
    const y = center.y;

    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `tp "${p.name}" ${x.toFixed(2)} ${y.toFixed(2)} ${z.toFixed(2)} ${direction} 0`
      );
    }, delay)
  });
}

function dialogue(scene, delay = 0, who = "eko") {
  if (who == "eko") {
    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `dialogue open @e[type=operation_future_durable:eko,tag=${scene}] @a ${scene}`
      );
    }, delay);
    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `dialogue change @e[type=operation_future_durable:eko,tag=${scene}] ${scene}`
      );
    }, delay + 5);
  }
  else if (who == "scientifique") {
    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `dialogue open @e[type=npc,tag=${scene}] @a ${scene}`
      );
    }, delay);
    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `dialogue change @e[type=npc,tag=${scene}] ${scene}`
      );
    }, delay + 5);
  }
}

function load_zone(zone) {
  const dim = world.getDimension("overworld");

  const coords = cinematic[zone];
  if (!coords) {
    decorator(`La zone '${zone}' n'existe pas.`, 1);
    return;
  }

  const area = coords.area;
  if (!area || area.length !== 2) {
    decorator(`La zone '${zone}' n'a pas deux coins valides.`, 1);
    return;
  }

  const margin = 2; // marge de sécurité
  const xs = area.map(p => p.x);
  const ys = area.map(p => p.y);
  const zs = area.map(p => p.z);

  const x1 = Math.floor(Math.min(...xs) - margin);
  const y1 = Math.floor(Math.min(...ys) - margin);
  const z1 = Math.floor(Math.min(...zs) - margin);

  const x2 = Math.ceil(Math.max(...xs) + margin);
  const y2 = Math.ceil(Math.max(...ys) + margin);
  const z2 = Math.ceil(Math.max(...zs) + margin);

  const name = `${zone}_TA`;

  dim.runCommandAsync(
    `tickingarea add ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${name}`
  ).then(() => {
    decorator(`Ticking area '${name}' chargée.`, 1);
  }).catch(err => {
    decorator(`Impossible de créer la ticking area: ${err}`, 1);
  });
}

function unload_zone(zone) {
  const dim = world.getDimension("overworld");
  const name = `${zone}_TA`;

  // Suppression de la ticking area
  dim.runCommandAsync(`tickingarea remove ${name}`).then(() => {
    decorator(`Ticking area '${name}' déchargée.`, 1);
  }).catch(err => {
    decorator(`Impossible de supprimer la ticking area: ${err}`, 1);
  });
}

function cinematics(zoneName, wait) {
  const zoneData = cinematic[zoneName];
  if (!zoneData) {
    decorator(`Zone '${zoneName}' introuvable`, 1);
    return;
  }
  decorator(`Démarrage de la cinématique '${zoneName}'`, 1);


  const path = zoneData.path;
  if (!path || path.length === 0) return;

  let totalTime = wait; // cumul du temps pour les runTimeout

  // Parcourir les points du path
  path.forEach((step, index) => {
    const pos = step;
    const rot = step.rot || { x: 0, y: 0 };
    decorator(`Point ${index}: x:${pos.x} y:${pos.y} z:${pos.z} rotX:${rot.x} rotY:${rot.y}`, 1);
    const speed = step.speed || 10; // en secondes pour ease

    system.runTimeout(async () => {
      const dim = world.getDimension("overworld");
      let cmd = "";

      if (index === 0) {
        // premier point, pas de ease
        cmd = `camera @a set minecraft:free pos ${pos.x} ${pos.y} ${pos.z} rot ${rot.x} ${rot.y}`;
      } else {
        // points suivants, ease et linear
        cmd = `camera @a set minecraft:free ease ${speed} linear pos ${pos.x} ${pos.y} ${pos.z} rot ${rot.x} ${rot.y}`;
      }

      await dim.runCommandAsync(cmd);
    }, totalTime);

    // incrémente le temps pour le prochain point
    totalTime += index === 0 ? 20 : speed * 20; // 20 ticks = 1 seconde


    // Action spécifique pour certaines cinématiques
    if (zoneName === "water_cleaning") {
      system.runTimeout(async () => {
        const dim = world.getDimension("overworld");
        await dim.runCommandAsync(`fill 900 15 1693 905 7 1698 air replace lime_stained_glass`);
      }, 100);
      decorator(`Clear eau`, 1);
    }
  });


  // Fade out avant la fin
  system.runTimeout(async () => {
    await world.getDimension("overworld").runCommandAsync(`camera @a fade time 0.5 0.5 1 color 0 0 0`);
  }, totalTime + 8);

  // Clear camera à la fin
  system.runTimeout(async () => {
    await world.getDimension("overworld").runCommandAsync(`camera @a clear`);
    decorator(`Fin de la cinématique '${zoneName}'`, 1);
  }, totalTime + 20);

}


function robot_iterate(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    // déplace l’armor_stand “iteration” vers l’avantz
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s run tp @s ^ ^ ^1`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s run setblock ^-2 ^-2 ^ redstone_block`);
    // ensuite on envoie la détection

    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_detect`);
  }, 5);

}

function robot_detect(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    // Diamant : avancer
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ diamond_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s rotated as @s run tp @s ^ ^ ^1`);

    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ diamond_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s rotated as @s run tp @s ^ ^ ^1`);

    // Lapis : tourner -90
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ lapis_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s run tp @s ~ ~ ~ ~-90 ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ lapis_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s run tp @s ~ ~ ~ ~-90 ~`);

    // Émeraude : tourner +90
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ emerald_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s run tp @s ~ ~ ~ ~90 ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ emerald_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s run tp @s ~ ~ ~ ~90 ~`);

    // Air : Fini trop tôt ou trou dans le code
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ air run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] run tag @s add wrong`);

    // Vérifie l’erreur de position
    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_checkerror`);
  }, 5);
}

function robot_checkerror(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    // vérifie si le robot est au dessus du bon bloc (jaune = succes, rouge = ok, autre = erreur)
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s unless block ~ ~-1 ~ red_concrete run tag @s add wrong`);
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ yellow_concrete run tag @s add succes`);
    // permet la visibilite quand Eko avance correctement
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ red_concrete run fill ~ ~1 ~ ~ ~4 ~ glass replace light_gray_concrete`);
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ yellow_concrete run fill ~ ~1 ~ ~ ~4 ~ glass replace light_gray_concrete`);

    // selon le cas, on envoie l’itération, l’erreur ou le succès
    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=!wrong,tag=!stopped,tag=!succes] run scriptevent eko:a_3_${lvl}_iterate`);
    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=wrong, tag=!succes] run scriptevent eko:a_3_${lvl}_error`);
    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=succes] run scriptevent eko:a_3_${lvl}_succes`);
  }, 5); // 20 ticks = 1 s
}
function robot_error(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s rotated as @s run tp @s ^ ^ ^-1`);
    // Réactive le systeme de lancement
    if (lvl == "1") {
      await dim.runCommandAsync(`setblock 858 4 1695 blue_concrete`)
    }
    else if (lvl == "2") {
      await dim.runCommandAsync(`setblock 858 -10 1695 blue_concrete`)
    }
    else if (lvl == "3") {
      await dim.runCommandAsync(`setblock 858 -23 1695 blue_concrete`)
    }
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=wrong,tag=t_2025] remove wrong`);
    decorator(`§cErreur du robot niveau ${lvl}`, 0);

  }, 8);

}

function robot_init(lvl) {
  decorator(`Initialisation du robot niveau ${lvl}`, 1);
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    // place les eko_controlled au début
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=start_robot,tag=ex_${lvl},tag=t_2025] at @s rotated as @s run tp @e[type=operation_future_durable:eko_controlled,tag=t_2025] ^ ^ ^5 ~ ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=start_robot,tag=ex_${lvl},tag=t_2100] at @s rotated as @s run tp @e[type=operation_future_durable:eko_controlled,tag=t_2100] ^ ^ ^5 ~ ~`);

    // place l’armor_stand “iteration” au début
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=pos_0,tag=ex_${lvl}] at @s rotated as @s run tp @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] ~ ~ ~-1 ~ ~`);

    // nettoie les tags
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove stopped`);
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove succes`);
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove wrong`);

    // retire les lumieres ou les blocs de l'algo
    if (lvl == "1") {
      await dim.runCommandAsync(`fill 857 3 1690 857 3 1665 air`);
    }
    else if (lvl == "2") {
      await dim.runCommandAsync(`fill 857 -11 1690 857 -11 1665 air`);
    }
    else if (lvl == "3") {
      await dim.runCommandAsync(`fill 857 -25 1690 857 -25 1665 air`);
      await dim.runCommandAsync(`fill 859 -25 1663 886 -25 1663 air`);
    }

  }, 1);

}

function robot_succes(lvl) {
  const dim = world.getDimension("overworld");
  decorator(`Succès du robot niveau ${lvl}`, 1);

  system.runTimeout(async () => {
    if (lvl == "1") {
      // Réactive le systeme de lancement
      await dim.runCommandAsync(`setblock 858 4 1695 blue_concrete`);
      // Ouvre la porte pour le prochaine niveau
      await dim.runCommandAsync(`setblock 877 4 1695 redstone_block`);
      decorator(`<Eko>: Niveau ${lvl} terminé, descend à l'étage du dessous pour continuer !`, 0);
      dialogue("s_4_2_1", 5);
      dialogue("s_4_3_1", 5);

    }
    else if (lvl == "2") {
      // Réactive le systeme de lancement
      await dim.runCommandAsync(`setblock 858 -10 1695 blue_concrete`);
      // Ouvre la porte pour le prochaine niveau
      await dim.runCommandAsync(`setblock 877 -10 1695 redstone_block`);
      decorator(`<Eko>: Niveau ${lvl} terminé, descend à l'étage du dessous pour continuer !`, 0);
      dialogue("s_4_4_1", 5);
      dialogue("s_4_5_1", 5);
    }
    else if (lvl == "3") {
      // Réactive le systeme de lancement
      await dim.runCommandAsync(`setblock 858 -23 1695 blue_concrete`);
      dim.runCommandAsync(`scriptevent eko:s_4_6_1`);

    }
  }, 1);
  if (lvl == "3") {
    decorator("<Eko>: Félicitations ! J'ai atteint le bout de la canalisation, c'est réussi !", 0);
  }
  // Initialise le niveau suivant (3 fois pour forcer la rotation de Eko_controlled qui bug parfois coté client)
  else {
    system.runTimeout(async () => {
      robot_init(String(Number(lvl) + 1));
    }, 10);
    system.runTimeout(async () => {
      robot_init(String(Number(lvl) + 1));
    }, 20);
    system.runTimeout(async () => {
      robot_init(String(Number(lvl) + 1));
    }, 30);
  }

}

function robot_start(lvl) {
  const dim = world.getDimension("overworld");
  system.runTimeout(async () => {
    // empeche de relancer avant erreur ou succes
    if (lvl == "1") {
      await dim.runCommandAsync(`setblock 858 4 1695 air`);
    }
    else if (lvl == "2") {
      await dim.runCommandAsync(`setblock 858 -10 1695 air`);
    }
    else if (lvl == "3") {
      await dim.runCommandAsync(`setblock 858 -23 1695 air`);
    }
    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_init`);
  });

  system.runTimeout(async () => {
    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_iterate`);
  }, 20);

}


function addItemToChest(itemType, amount = 20, emballage = false, vis = false) {
  const dim = world.getDimension("overworld");

  // Le coffre où apparaissent les items
  const checks = [
    {
      name: "Conteneur",
      pos: { x: 958, y: 2, z: 925 }
    },
  ];
  // Verifie que le coffre est bien la
  for (const check of checks) {
    const block = dim.getBlock(check.pos);
    decorator(`Vérification de ${check.name}...`, 1);

    if (!block || block.typeId !== "minecraft:chest") {
      decorator(`Coffre manquant à ${JSON.stringify(check.pos)} !`, 1);
      continue;
    }
    const inventory = block.getComponent("minecraft:inventory");
    if (!inventory) {
      decorator(`${check.name} n'a pas d'inventaire !`, 1);
      continue;
    }

    const container = inventory.container;
    const itemsToAdd = amount;
    let added = false;
    let added_emballage = !emballage;
    let added_vis = !vis;

    // 1. Cherche item déjà la pour ajouter (empeche de faire stack complet)
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);

      if (item && item.typeId === itemType && item.amount < 44) {
        const newAmount = Math.min(item.amount + itemsToAdd, 64);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added = true;

        decorator(`Ajouté ${itemsToAdd} ${itemType} au slot ${slotIndex}`, 1);
        break;
      }

    }
    // Même principe pour emballage 
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);
      if (item && item.typeId === "operation_future_durable:emballage" && item.amount < 63 && emballage) {
        const newAmount = Math.min(item.amount + 1, 64);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added_emballage = true;
        decorator(`Ajouté 1 emballage au slot ${slotIndex}`, 1);
        break;
      }
    }
    // Même principe pour vis
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);
      if (item && item.typeId === "operation_future_durable:vis" && item.amount < 63 && vis) {
        const newAmount = Math.min(item.amount + 1, 2);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added_vis = true;
        decorator(`Ajouté 1 vis au slot ${slotIndex}`, 1);
        break;
      }
    }


    // 2. Sinon, cherche un slot vide
    if (!added) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        decorator(`Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`, 1);
        if (!item) {
          decorator(`Création de la pile ${itemType} x${itemsToAdd}`, 1);
          container.setItem(slotIndex, new ItemStack(itemType, itemsToAdd));
          decorator(`Ajout de ${itemsToAdd} ${itemType}`, 1);
          added = true;
          break;
        }
      }
    }
    // Même principe pour emballage
    if (!added_emballage) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        decorator(`Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`, 1);
        if (!item) {
          decorator(`Création de la pile operation_future_durable:emballage x 1`, 1);
          container.setItem(slotIndex, new ItemStack("operation_future_durable:emballage", 1));
          decorator(`Ajouté 1 operation_future_durable:emballage au slot vide ${slotIndex}`, 1);
          added_emballage = true;
          break;
        }
      }
    }
    // Même principe pour vis 
    if (!added_vis) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        decorator(`Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`, 1);
        if (!item) {
          decorator(`Création de la pile operation_future_durable:vis x 1`, 1);
          container.setItem(slotIndex, new ItemStack("operation_future_durable:vis", 1));
          decorator(`Ajouté 1 operation_future_durable:vis au slot vide ${slotIndex}`, 1);
          added_vis = true;
          break;
        }
      }
    }
    if (!added || !added_emballage || !added_vis) {
      decorator(`Pas de place pour ajouter un item dans ${check.name}`, 1);
    }
  }
}


// Fonction que l'inventaire d'un joueur soit vide
function checkPlayerInventory(player) {
  const container = player.getComponent("minecraft:inventory").container;

  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (!item) continue;
    else {
      decorator(`${player.name} Dépose tes items dans le coffre approprié !`, 0);
      return false;
    }
  }
  return true
}

function verifyChests(args = 0) {
  const dim = world.getDimension("overworld");
  const aliments = [
    { typeId: "operation_future_durable:oeuf", name: "Oeuf", category: "VVPO", trash: "poubelle ordinaire" },
    { typeId: "operation_future_durable:pate", name: "Pâte", category: "Féculents", trash: "poubelle ordinaire" },
    { typeId: "operation_future_durable:fromage", name: "Fromage", category: "Produit laitier", trash: "poubelle ordinaire" },
    { typeId: "minecraft:salmon", name: "Saumon", category: "VVPO", trash: "poubelle ordinaire" },
    { typeId: "operation_future_durable:huile_olive", name: "Huile d'olive", category: "Matière grasse", trash: "PMC" },
    { typeId: "operation_future_durable:yaourt", name: "Yaourt", category: "Produit laitier", trash: "PMC" },
    { typeId: "operation_future_durable:lait", name: "Lait", category: "Produit laitier", trash: "PMC" },
    { typeId: "minecraft:bread", name: "Pain", category: "Féculents", trash: "poubelle ordinaire" },
    { typeId: "minecraft:chicken", name: "Poulet", category: "VVPO", trash: "poubelle ordinaire" },
    { typeId: "minecraft:potato", name: "Pomme de terre", category: "Féculents", trash: "compost" },
    { typeId: "minecraft:beef", name: "Bœuf", category: "VVPO", trash: "poubelle ordinaire" },
    { typeId: "operation_future_durable:riz", name: "Riz", category: "Féculents", trash: "poubelle ordinaire" },
    { typeId: "operation_future_durable:eau", name: "Eau", category: "Eau", trash: "réutilisation et revente" },
    { typeId: "minecraft:apple", name: "Pomme", category: "Fruits et légumes", trash: "compost" },
    { typeId: "minecraft:carrot", name: "Carotte", category: "Fruits et légumes", trash: "compost" },
    { typeId: "operation_future_durable:aubergine", name: "Aubergine", category: "Fruits et légumes", trash: "compost" },
    { typeId: "operation_future_durable:banane", name: "Banane", category: "Fruits et légumes", trash: "compost" },
    { typeId: "operation_future_durable:poire", name: "Poire", category: "Fruits et légumes", trash: "compost" },
    { typeId: "operation_future_durable:poivron", name: "Poivron", category: "Fruits et légumes", trash: "compost" },
    { typeId: "operation_future_durable:emballage", name: "Emballage", category: "Autre", trash: "PMC" },
    { typeId: "operation_future_durable:vis", name: "Vis", category: "Autre", trash: "réutilisation et revente" },
  ];

  // Définir les coffres + leurs contenus attendus

  // Les coffres des poubelles
  const checks_recycle = [
    {
      name: "Poubelle",
      pos: { x: 971, y: -6, z: 919 },
      pos_light: { x: 971, y: -7, z: 918 },
      expected: [
        { typeId: "operation_future_durable:oeuf", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:pate", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:fromage", amount: 0, here: false, strict: false },
        { typeId: "minecraft:salmon", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:huile_olive", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:yaourt", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:lait", amount: 0, here: false, strict: false },
        { typeId: "minecraft:bread", amount: 0, here: false, strict: false },
        { typeId: "minecraft:chicken", amount: 0, here: false, strict: false },
        { typeId: "minecraft:potato", amount: 0, here: false, strict: false },
        { typeId: "minecraft:beef", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:riz", amount: 0, here: false, strict: false },
      ],
    },
    {
      name: "PMC",
      pos: { x: 971, y: -6, z: 922 },
      pos_light: { x: 971, y: -7, z: 921 },
      expected: [
        { typeId: "operation_future_durable:emballage", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:huile_olive", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:lait", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:yaourt", amount: 0, here: false, strict: false },
      ],
    },
    {
      name: "Réutilsation et Revente",
      pos: { x: 971, y: -6, z: 925 },
      pos_light: { x: 971, y: -7, z: 924 },
      expected: [
        { typeId: "operation_future_durable:vis", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:eau", amount: 0, here: false, strict: false },
      ],
    },
    {
      name: "Compost",
      pos: { x: 971, y: -6, z: 928 },
      pos_light: { x: 971, y: -7, z: 927 },
      expected: [
        { typeId: "minecraft:apple", amount: 0, here: false, strict: false },
        { typeId: "minecraft:carrot", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:aubergine", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:banane", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:poire", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:poivron", amount: 0, here: false, strict: false },
        { typeId: "minecraft:potato", amount: 0, here: false, strict: false },
        { typeId: "minecraft:bread", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:oeuf", amount: 0, here: false, strict: false },
        { typeId: "operation_future_durable:riz", amount: 0, here: false, strict: false },
      ],
    },
    {
      name: "Conteneur",
      pos: { x: 958, y: 2, z: 925 },
      expected: [
      ],
    },
  ];

  // Les coffres de la pyramide alimentaire
  const checks_pyramide = [
    {
      name: "Coffre Eau",
      pos: { x: 956, y: -6, z: 928 },
      pos_light: { x: 955, y: -6, z: 930 },
      expected: [
        { typeId: "operation_future_durable:eau", amount: 120, here: false, strict: true },
      ],
    },
    {
      name: "Coffre Fruits et Legumes",
      pos: { x: 956, y: -5, z: 928 },
      pos_light: { x: 955, y: -5, z: 930 },
      expected: [
        { typeId: "minecraft:apple", amount: 30, here: false, strict: true },
        { typeId: "minecraft:carrot", amount: 30, here: false, strict: true },
        { typeId: "operation_future_durable:aubergine", amount: 30, here: false, strict: true },
        { typeId: "operation_future_durable:banane", amount: 30, here: false, strict: true },
        { typeId: "operation_future_durable:poire", amount: 30, here: false, strict: true },
        { typeId: "operation_future_durable:poivron", amount: 30, here: false, strict: true },
      ],
    },
    {
      name: "Coffre Féculents",
      pos: { x: 956, y: -4, z: 928 },
      pos_light: { x: 955, y: -4, z: 930 },
      expected: [
        { typeId: "minecraft:bread", amount: 20, here: false, strict: true },
        { typeId: "minecraft:potato", amount: 20, here: false, strict: true },
        { typeId: "operation_future_durable:pate", amount: 20, here: false, strict: true },
        { typeId: "operation_future_durable:riz", amount: 20, here: false, strict: true },
      ],
    },
    {
      name: "Coffre produit laitier",
      pos: { x: 956, y: -3, z: 928 },
      pos_light: { x: 955, y: -3, z: 930 },
      expected: [
        { typeId: "operation_future_durable:lait", amount: 20, here: false, strict: true },
        { typeId: "operation_future_durable:fromage", amount: 20, here: false, strict: true },
        { typeId: "operation_future_durable:yaourt", amount: 20, here: false, strict: true },
      ],
    },
    {
      name: "Coffre Viandes",
      pos: { x: 956, y: -3, z: 924 },
      pos_light: { x: 955, y: -3, z: 923 },
      expected: [
        { typeId: "minecraft:beef", amount: 20, here: false, strict: true },
        { typeId: "minecraft:chicken", amount: 20, here: false, strict: true },
        { typeId: "operation_future_durable:oeuf", amount: 20, here: false, strict: true },
        { typeId: "minecraft:salmon", amount: 20, here: false, strict: true },
      ],
    },
    {
      name: "Coffre matiere grasse",
      pos: { x: 956, y: -2, z: 928 },
      pos_light: { x: 955, y: -2, z: 930 },
      expected: [
        { typeId: "operation_future_durable:huile_olive", amount: 10, here: false, strict: true },
      ],
    },
  ]

  let checks;
  let allGood = true;
  let message_visible = true;

  //Attribution des coffres à vérifier
  if (args === 0) {
    checks = checks_pyramide;
  }
  else {
    checks = checks_recycle;
    for (const player of world.getAllPlayers()) {
      // Pour point 2) L'inventaire doit être vide
      allGood = checkPlayerInventory(player);
      if (!allGood) return;
    }
  }


  for (const check of checks) {
    const block = dim.getBlock(check.pos);

    if (!block || block.typeId !== "minecraft:chest") {
      decorator(` ${check.name} manquant à ${JSON.stringify(check.pos)} !`, 1);
      allGood = false;
      continue;
    }

    const inventory = block.getComponent("minecraft:inventory");
    const container = inventory.container;

    // Remettre tous les `here` à false au cas où pour s'assurer de verifier que tout doit etre la
    check.expected.forEach(exp => exp.here = false);

    // Enregistre le contenu actuel du coffre
    const counts = {};
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);
      if (!item) continue;
      counts[item.typeId] = (counts[item.typeId] || 0) + item.amount;
    }

    // Vérifier par rapport aux attendus
    let chestGood = true;
    for (const exp of check.expected) {

      // Regarde si il faut le nombre exact (strict) ou au moins (non strict)
      if (exp.strict) {
        const actual = counts[exp.typeId] || 0;
        const info = aliments.find(a => a.typeId === exp.typeId);
        if (actual !== exp.amount) {
          chestGood = false;
          // Ne doit afficher qu'un seul message à la fois pour eviter de surcharger le joueur
          if (message_visible) {
            decorator(
              `${check.name} attendait ${exp.amount} ${info ? info.name : exp.typeId}, trouvé ${actual}`, 0
            );
          }
          message_visible = false;
        }
      }
      else {
        const actual = counts[exp.typeId] || 0;
        if (actual < exp.amount) {
          chestGood = false;
          if (message_visible) {
            decorator(
              `${check.name} attendait au moins ${exp.amount} ${info ? info.name : exp.typeId}, trouvé ${actual}`, 0
            );
          }
          message_visible = false;
        }
      }
      // Il y a eu erreur du joueur
      if (!chestGood) {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `/setblock ${check.pos_light.x} ${check.pos_light.y} ${check.pos_light.z} minecraft:air`
          );
        });
      }
    }

    // Vérifier qu'il n'y a pas d'item non attendu
    for (const typeId in counts) {
      if (!check.expected.some(exp => exp.typeId === typeId)) {
        chestGood = false;

        // Cherche l'aliment correspondant
        const info = aliments.find(a => a.typeId === typeId);
        if (message_visible) {

          if (info) {
            //pyramide
            if (args === 0) {
              if (info.category === "Autre") {
                decorator(`${check.name} contient un item inattendu : ${info.name}`, 0);
              }
              else {
                decorator(
                  `${check.name} contient un item inattendu : ${info.name} x${counts[typeId]}, devrait aller dans : ${info.category}`, 0
                );
              }
            }
            //poubelle
            else {
              decorator(
                `${check.name} contient un item inattendu : ${info.name} x${counts[typeId]}, devrait aller dans ${info.trash}`, 0
              );
            }
          }
          // Si l'item n'est pas dans la liste des aliments + emballage et vis
          else {
            decorator(
              `${check.name} contient un item inattendu inconnu : ${typeId} x${counts[typeId]}`, 0
            );
          }
          message_visible = false;
          break;
        }
      }
    }


    if (chestGood) {
      system.runTimeout(async () => {
        await world.getDimension("overworld").runCommandAsync(
          `/setblock ${check.pos_light.x} ${check.pos_light.y} ${check.pos_light.z} minecraft:redstone_block`
        );
      });
      decorator(`${check.name} correct !`, 1);
    } else {
      decorator(`${check.name} incorrect !`, 1);
      allGood = false;
      system.runTimeout(async () => {
        await world.getDimension("overworld").runCommandAsync(
          `/setblock ${check.pos_light.x} ${check.pos_light.y} ${check.pos_light.z} minecraft:air`
        );
      });

    }

  }

  if (allGood) {
    decorator("Tous les coffres sont corrects !", 0);
    return true
  }
  return false;
}


// Check de l'éolienne relativement à un armor_stand
function verifyStructure() {
  const dim = world.getDimension("overworld");
  const stands = dim.getEntities({ type: "minecraft:armor_stand", tags: ["checker"] });

  if (stands.length === 0) {
    decorator("Aucun armor stand 'checker' trouvé !", 1);
    return;
  }

  const origin = stands[0].location;
  let allGood = true;

  for (let x = 0; x < 22; x++) {
    for (let y = 0; y < 29; y++) {
      for (let z = 0; z < 6; z++) {
        const posA = { x: Math.floor(origin.x) + x, y: Math.floor(origin.y) + 38 + y, z: Math.floor(origin.z) + z };
        const posB = { x: Math.floor(origin.x) + x, y: Math.floor(origin.y) + y, z: Math.floor(origin.z) + z };

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
            dim.getBlock(posA).setType("minecraft:coal_block");
          }
          allGood = false;
        }
      }
    }
  }

  if (allGood) {
    decorator("Structure correcte !", 0);
    system.runTimeout(async () => {
      await world.getDimension("overworld").runCommandAsync(
        `scriptevent eko:s_2_4_2`
      );
    }, 40);
  } else {
    decorator("Structure incorrecte !", 0);
  }
}


function showRoomData(player, checker) {
  const dim = world.getDimension("overworld");
  // Récupération des markers à proximité
  const nearbyMarkers = dim.getEntities({
    location: player.location,
    maxDistance: 4,
    type: "operation_future_durable:marker",
    tags: [checker.tag]
  });

  if (nearbyMarkers.length === 0) {
    decorator(`Aucune donnée ici.`, 0);
    return;
  }

  const marker = nearbyMarkers[0];

  // Tag des objets possibles
  const contextTags = ["fenetre", "lampe", "electromenager", "evier", "toit", "television"];
  const contextTag = marker.getTags().find(t => contextTags.includes(t));

  // Message en fonction de l'objet détecté
  if (contextTag) {
    switch (contextTag) {
      case "fenetre":
        decorator("Il est important de bien isoler les fenêtres pour éviter les pertes de chaleur !", 0);
        break;
      case "lampe":
        decorator(`La lampe est allumée en permanence, attention à l'énergie !`, 0);
        break;
      case "electromenager":
        decorator(`Il est important de regarder à la consommation des vieux appareils, ce four ancien consomme beaucoup trop !`, 0);
        break;
      case "evier":
        decorator(`L'évier est ouvert, de l'eau est perdue !`, 0);
        break;
      case "toit":
        decorator("Il est important de bien isoler le toit pour éviter les pertes de chaleur !", 0);
        break;
      case "television":
        decorator(`La télévision et les consoles de jeux consomment de l'énergie, même en veille, pense à les éteindre !`, 0);
        break;
      default:
        decorator(`Il y a un objet détecté.`, 0);
    }
  } else {
    decorator(`Aucun objet détecté.`, 0);
  }
  system.runTimeout(async () => {
    await dim.runCommandAsync(`scriptevent eko:a_2_${contextTag}`);
  }, 10);
  decorator(`scriptevent eko:a_2_${contextTag}`, 1);

}

world.afterEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  // Empêche l’utilisation de certains aliments 
  if (
    item &&
    ["minecraft:carrot", "minecraft:egg", "minecraft:beef", "minecraft:chicken", 'minecraft:apple', "minecraft:bread", "minecraft:salmon", "minecraft:potato"]
      .includes(item.typeId)
  ) {
    event.cancel = true;
  }
  // Outil permettant de récupérer les coordonnées et l'orientation du joueur (pour les admins)
  if (item?.typeId === "minecraft:stick") {
    event.cancel = true;

    system.run(() => {
      const player = event.source;            // le joueur qui a cliqué
      const pos = player.location;            // position XYZ
      const rot = player.getRotation();       // { x: pitch, y: yaw }

      decorator(
        `${player.name} a cliqué avec un bâton à ` +
        `x:${pos.x.toFixed(1)} y:${pos.y.toFixed(1)} z:${pos.z.toFixed(1)} ` +
        `(pitch:${rot.x.toFixed(1)} yaw:${rot.y.toFixed(1)})`, 1
      );
    });
  }
  // Lancement du jeu
  else if (item?.typeId === "minecraft:totem_of_undying") {
    event.cancel = true
    decorator("Prêt à commencer ?", 0);
    system.runTimeout(async () => {
      const dim = world.getDimension("overworld");

      await dim.runCommandAsync(`dialogue open @e[type=npc,x=-10,y=40,z=-10,dx=10,dy=60,dz=10] @a s_0_0_0`);
    });

  }

  //Utilisations des outils de mesure
  else if (item && item.typeId === "operation_future_durable:thermometre") {
    event.cancel = true;
    decorator("Thermomètre utilisé", 1);
    system.run(() => {
      showRoomData(player, checkers[0]);
    });
  }
  else if (item && item.typeId === "operation_future_durable:multimetre") {
    event.cancel = true;
    decorator("Multimètre utilisé", 1);
    system.run(() => {
      showRoomData(player, checkers[1]);
    });
  }
  else if (item && item.typeId === "operation_future_durable:compteur_eau") {
    event.cancel = true;
    decorator("Compteur d'eau utilisé", 1);
    system.run(() => {
      showRoomData(player, checkers[2]);
    });
  }
});

// --- Gestion des events ---
system.afterEvents.scriptEventReceive.subscribe(ev => {
  if (ev.id == "eko:VerifyStructure") {
    decorator("Vérification de la structure lancée !", 0);
    verifyStructure();

  }
  // Vérifie que l'id commence bien par "eko:a_"
  if (ev.id.startsWith("eko:a")) {
    if (ev.id.split("_")[1] == "2") {

      const scoreName = ev.id.split("_")[2];
      system.runTimeout(async () => {
        const dim = world.getDimension("overworld");

        if (scoreName === "succes") {
          decorator("<EKO> : Bravo ! Vous avez trouvé tous les éléments problématique de la maison. Revenez me voir !", 0);
          await dim.runCommandAsync(`dialogue change @e[type=operation_future_durable:eko,tag=s_3_3_1] s_3_3_1`);
          await dim.runCommandAsync(`scoreboard players set checkpoint progres 3`);
        }
        else {


          // Met à jour le score de l'élément trouvé
          // Puis recalcule le score total

          await dim.runCommandAsync(`scoreboard players set ${scoreName} maison 1`);
          await dim.runCommandAsync(`scoreboard players reset total maison`);
          await dim.runCommandAsync(`scoreboard players set total maison_total 0`);
          await dim.runCommandAsync(`scoreboard players operation total maison_total += * maison`);

          // Vérifie le score total après la mise à jour
          const obj = world.scoreboard.getObjective("maison_total");
          const totalScore = obj.getScore("total") ?? 0;

          if (totalScore >= 6) {
            await dim.runCommandAsync(`scriptevent eko:a_2_succes`);
          }
        }
      }, 1);

    }
    else if (ev.id.split("_")[1] == "3") {
      const lvl = ev.id.split("_")[2];
      if (ev.id.split("_")[3] == "init") {
        robot_init(lvl);
      }
      else if (ev.id.split("_")[3] == "start") {
        robot_start(lvl);
      }
      else if (ev.id.split("_")[3] == "iterate") {
        robot_iterate(lvl);
      }
      else if (ev.id.split("_")[3] == "detect") {
        robot_detect(lvl);
      }
      else if (ev.id.split("_")[3] == "checkerror") {
        robot_checkerror(lvl);
      }
      else if (ev.id.split("_")[3] == "error") {
        robot_error(lvl);
      }
      else if (ev.id.split("_")[3] == "succes") {
        robot_succes(lvl);
      }
    }
    else if (ev.id.split("_")[1] == "4") {
      const item = ev.id.split("_")[2];
      switch (item) {
        case "pyramide": {
          if (verifyChests(0)) {
            system.runTimeout(async () => {
              await world.getDimension("overworld").runCommandAsync(
                `/scriptevent eko:s_5_2_1`
              );
            }, 50);

          };
          break;
        }
        case "trash": {
          if (verifyChests(1)) {
            system.runTimeout(async () => {
              await world.getDimension("overworld").runCommandAsync(
                `/scriptevent eko:s_5_3_1`
              );
            }, 50);

          };
          break;
        }
        case "eau": {
          addItemToChest("operation_future_durable:eau", 20, true);
          break;
        }
        case "pomme": {
          addItemToChest("minecraft:apple", 20, true);
          break;
        }
        case "poire": {
          addItemToChest("operation_future_durable:poire", 20, true);
          break;
        }
        case "banane": {
          addItemToChest("operation_future_durable:banane", 20);
          break;
        }
        case "aubergine": {
          addItemToChest("operation_future_durable:aubergine", 20);
          break;
        }
        case "poivron": {
          addItemToChest("operation_future_durable:poivron", 20);
          break;
        }
        case "carotte": {
          addItemToChest("minecraft:carrot", 20);
          break;
        }
        case "pain": {
          addItemToChest("minecraft:bread", 20);
          break;
        }
        case "riz": {
          addItemToChest("operation_future_durable:riz", 20, true);
          break;
        }
        case "patate": {
          addItemToChest("minecraft:potato", 20);
          break;
        }
        case "pate": {
          addItemToChest("operation_future_durable:pate", 20, true);
          break;
        }
        case "lait": {
          addItemToChest("operation_future_durable:lait", 20, true);
          break;
        }
        case "fromage": {
          addItemToChest("operation_future_durable:fromage", 20, true, true);
          break;
        }
        case "yaourt": {
          addItemToChest("operation_future_durable:yaourt", 20, true);
          break;
        }
        case "poulet": {
          addItemToChest("minecraft:chicken", 20, true);
          break;
        }
        case "boeuf": {
          addItemToChest("minecraft:beef", 20, true);
          break;
        }
        case "oeuf": {
          addItemToChest("operation_future_durable:oeuf", 20);
          break;
        }
        case "saumon": {
          addItemToChest("minecraft:salmon", 20);
          break;
        }
        case "huileolive": {
          addItemToChest("operation_future_durable:huile_olive", 20);
          break;
        }
      }
    }

  }

  if (ev.id.startsWith("eko:s")) {

    const sceneName = "s_" + ev.id.split("_").slice(1, 4).join("_");
    decorator(`Démarrage de scene ${sceneName}`, 1);
    switch (sceneName) {

      case "s_1_1_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `time set day`
          );
        }, 20);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `clear @a`
          );
        }, 10);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `effect @a speed 1000000000 1 true`
          );
        }, 20);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `effect @a clear night_vision`
          );
        }, 20);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 2 2.5 color 0 0 0`
          );
        }, 1);

        tpPlayersDispersed({ x: 123.5, y: -1.2, z: 1785 }, 75, 10, 1);
        dialogue(sceneName, 170);

        [120, 125, 130].forEach(delay => {
          system.runTimeout(async () => {
            await world.getDimension("overworld").runCommandAsync(
              `playsound mob.zombie.wood @a ${paths["s_1_2_1"][1].x} ${paths["s_1_2_1"][1].y} ${paths["s_1_2_1"][1].z} 0.5 3`
            );
          }, delay);
          decorator(`Son de pas dans ${delay} ticks`, 1);
        });
        break;
      }

      case "s_1_2_1": {
        system.runTimeout(async () => {

          await world.getDimension("overworld").runCommandAsync(
            `setblock 117 -4 1784 redstone_block`
          );
        }, 2);
        system.runTimeout(async () => {

          await world.getDimension("overworld").runCommandAsync(
            `setblock 117 -4 1784 air`
          );
        }, 5);
        system.runTimeout(async () => {

          await world.getDimension("overworld").runCommandAsync(
            `playsound open.wooden_door @a ${paths["s_1_2_1"][0].x} ${paths["s_1_2_1"][0].y} ${paths["s_1_2_1"][0].z} 0.5 1`
          );
        }, 2);
        dialogue(sceneName, 100);
        followPath(sceneName);
        break;
      }

      case "s_1_3_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);

        tpPlayersDispersed({ x: 215.5, y: -12, z: 1715.5 }, 75, 20, 1);

        dialogue(sceneName, 120);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `time set midnight`
          );
        }, 20);
        break;
      }

      case "s_1_4_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 223.5, y: -10, z: 1723.5 }, 180, 20, 1);
        dialogue(sceneName, 100);
      }
        break;
      case "s_1_5_1": {
        followPath(sceneName); // gauche
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_5_1] s_1_5_1`
          );
        }, 10);
        break;
      }

      case "s_1_6_1": {
        followPath(sceneName); // droite
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_6_1] s_1_6_1`
          );
        }, 10);
        break;
      }

      case "s_1_7_1": {
        followPath(sceneName); //labyrinthe
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_7_1] s_1_7_1`
          );
        }, 10);
        break;
      }

      case "s_1_8_1": {
        followPath(sceneName); //labyrinthe
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_8_1] s_1_8_1`
          );
        }, 10);
        break;
      }

      case "s_1_9_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 215.5, y: -12, z: 1715.5 }, 75, 20, 1);
        dialogue(sceneName, 100, "scientifique");

        break;
      }

      case "s_1_10_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);

        cinematics("futur_1", 35);
        tpPlayersDispersed({ x: 958.5, y: -7, z: 53.5 }, 305, 15, 2);
        dialogue(sceneName, 650);
        break;
      }

      case "s_2_1_1": {
        followPath(sceneName);
        dialogue(sceneName, 400);
        break;
      }

      case "s_2_2_1": {

        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `time set day`
          );
        }, 20);
        cinematics("present_1", 35);
        tpPlayersDispersed({ x: 1010.5, y: -5, z: 2082.5 }, 0, 15, 2);
        dialogue(sceneName, 660);
        break;
      }

      case "s_2_3_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 1.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 995, y: -5, z: 2171 }, 0, 20, 2);
        dialogue(sceneName, 100);

        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `ability @a mayfly true`
          );
        }, 10);

        break;
      }

      case "s_2_4_1": {
        dialogue(sceneName, 50);

        break;
      }

      case "s_2_4_2": {
        dialogue(sceneName, 12);
        break;
      }

      case "s_2_5_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `ability @a mayfly false`
          );
        }, 5);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `clear @a`
          );
        }, 10);

        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 2007, y: -7, z: 57 }, 0, 15, 2);
        cinematics("futur_2", 35);
        dialogue(sceneName, 700);
        break;
      }

      case "s_2_6_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 850);
        tpPlayersDispersed({ x: 1040, y: -6, z: 1937 }, 180, 870, 2);

        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `scriptevent eko:s_2_6_2`
          );
        }, 890);
        break;
      }
      case "s_2_6_2": {
        dialogue(sceneName, 12);
        break;
      }

      case "s_3_1_1": {
        dialogue(sceneName, 12);
        break;
      }

      case "s_3_2_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `give @a operation_future_durable:thermometre 1 0 {"minecraft:item_lock":{"mode":"lock_in_inventory"}}`
          );
          await world.getDimension("overworld").runCommandAsync(
            `give @a operation_future_durable:multimetre 1 0 {"minecraft:item_lock":{"mode":"lock_in_inventory"}}`
          );
          await world.getDimension("overworld").runCommandAsync(
            `give @a operation_future_durable:compteur_eau 1 0 {"minecraft:item_lock":{"mode":"lock_in_inventory"}}`
          );
        }, 5);
        break;
      }

      case "s_3_2_2": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] ${sceneName}`
          );
        });
        break;

      }
      case "s_3_3_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] ${sceneName}`
          );
        });
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `clear @a`
          );
        });
        break;

      }
      case "s_3_4_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 2049, y: -7, z: 943 }, 220, 15, 2);
        cinematics("futur_3", 35);
        dialogue(sceneName, 700);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `clear @a`
          );
        });
        break;

      }
      case "s_3_5_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 360);
        tpPlayersDispersed({ x: 1904.5, y: 8, z: 709.5 }, 180, 380, 1);
        dialogue("s_3_5_2", 440);
        break;

      }
      case "s_3_6_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 10);
        tpPlayersDispersed({ x: 904.5, y: 8, z: 1709.5 }, 180, 30, 1);
        dialogue(sceneName, 100);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `effect @a night_vision 100000000 1 true`
          );
        }, 10);
        break;

      }
      case "s_3_7_1": {
        followPath(sceneName);
        dialogue(sceneName, 380);
        break;

      }
      case "s_4_1_1": {
        followPath(sceneName);
        dialogue(sceneName, 200);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `tickingarea add 887 11 1664 858 3 1692 zone2025`
          );
        }, 1);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `tickingarea add 1887 11 664 1858 3 692 zone2100`
          );
        }, 1);

        break;

      }
      case "s_4_1_6": {
        dialogue(sceneName, 12);
        break;

      }
      case "s_4_2_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `scriptevent eko:s_4_3_1`
          );
        }, 1);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] s_4_1_6`
          );
        });

        break;

      }
      case "s_4_3_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] s_4_1_7`
          );
        });
        break;

      }
      case "s_4_4_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `scriptevent eko:s_4_5_1`
          );
        }, 1);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] s_4_1_6`
          );
        });
        break;

      }
      case "s_4_5_1": {
        followPath(sceneName);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName}] s_4_1_7`
          );
        });
        break;

      }
      case "s_4_6_1": {
        cinematics("water_cleaning", 20);
        tpPlayersDispersed({ x: 877.5, y: -24.00, z: 1676.5 }, -169, 100, 2);

        dialogue(sceneName, 300);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `tickingarea remove zone2025`
          );
        }, 1);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `tickingarea remove zone2100`
          );
        }, 1);
        break;

      }

      case "s_4_7_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 20);
        tpPlayersDispersed({ x: 1002.5, y: -8.00, z: 903.5 }, 157, 30, 2);
        cinematics("futur_4", 50);
        dialogue(sceneName, 700);
        break;

      }
      case "s_4_8_1": {
        followPath(sceneName);
        dialogue(sceneName, 250);
        break;

      }
      case "s_5_1_1": {
        dialogue(sceneName, 20);
        break;
      }
      case "s_5_2_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `/clone 971 -12 918 972 -11 928 971 -6 918`
          );
        }, 1);
        dialogue(sceneName, 20);

        break;
      }
      case "s_5_3_1": {
        dialogue(sceneName, 20);
        break;
      }
      case "s_5_4_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 4.5 2.5 color 0 0 0`
          );
        }, 10);
        tpPlayersDispersed({ x: 0.5, y: -6, z: 1000.5 }, 150, 20, 2);
        cinematics("futur_5", 100);
        dialogue(sceneName,2020)
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `title @p times 10 70 20`
          );
        }, 10);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `titleraw @a title {"rawtext":[{"text":"§eFélicitations !"}]}`
          );
        }, 150);
        

        break;
      }
    }
  }
  // Reset d’un chemin
  if (ev.id.startsWith("eko:r")) {
    const max_chapitre = 5;
    const max_checkpoint = 11;
    const sceneName = "s_" + ev.id.split("_").slice(1, 4).join("_");
    const overworld = world.getDimension("overworld");
    world.sendMessage(`[DEBUG] Reset du chemin ${sceneName}`);

    progres.setScore("chapitre", Number(ev.id.split("_")[1]));
    progres.setScore("checkpoint", Number(ev.id.split("_")[2]));
    progres.setScore("player", 0);

    // Génère la liste des scènes à parcourir (ordre descendant)
    const scenes = [];
    for (let chapitre = max_chapitre; chapitre >= 1; chapitre--) {
      for (let checkpoint = max_checkpoint; checkpoint >= 1; checkpoint--) {
        scenes.push(`s_${chapitre}_${checkpoint}_1`);
      }
    }

    // Traitement d'une scène après l'autre 
    function processNextScene(index) {
      if (index >= scenes.length) return;
      const sceneName_temp = scenes[index];
      const pathArray = paths[sceneName_temp];
      if (!pathArray || pathArray.length === 0) {
        // Scène vide → passer à la suivante
        if (sceneName_temp !== sceneName) {
          processNextScene(index + 1);
        }
        return;
      }

      world.sendMessage(`[DEBUG] Gestion de la scène ${sceneName_temp}`);
      const tpFlag = pathArray[0];
      const pathPoints = pathArray.slice(1);
      const { x, y, z } = pathPoints[0];

      const xs = pathPoints.map(p => p.x);
      const ys = pathPoints.map(p => p.y);
      const zs = pathPoints.map(p => p.z);
      const margin = 2;
      const x1 = Math.floor(Math.min(...xs) - margin);
      const y1 = Math.floor(Math.min(...ys) - margin);
      const z1 = Math.floor(Math.min(...zs) - margin);
      const x2 = Math.ceil(Math.max(...xs) + margin);
      const y2 = Math.ceil(Math.max(...ys) + margin);
      const z2 = Math.ceil(Math.max(...zs) + margin);

      // --- Séquence pour UNE scène ---

      // Ajout de la ticking area pour charger les chunks du chemin (et detecter les eko)
      system.runTimeout(() => {
        overworld.runCommandAsync(
          `tickingarea add ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${sceneName_temp}_TA`
        );
        // cas précis de scene
        if (sceneName_temp === "s_1_1_1"){
           system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea add -10 -10 -10 10 70 10 Spawn`
            );
          });
          safeClone({ x: 0, y: 49, z: 5 }, { x: 0, y: 49, z: 5 }, { x: 0, y: 51, z: 5 },20);
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea remove Spawn`
            );
          }, 100);
        }
       
        if (sceneName_temp === "s_1_2_1") {
          system.runTimeout(() =>
            overworld.runCommandAsync(`setblock 117 -2 1785 birch_door`),
            20);
            
        }

        if (sceneName_temp === "s_2_2_1") {
           system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea add 990 -20 2170 1020 30 2180 Eolienne`
            );
          });
          system.runTimeout(() =>
            overworld.runCommandAsync(`fill 995 -5 2174 1016 24 2179 air`),
            50);
            safeClone({ x: 993, y: -10, z: 2174 }, { x: 994, y: -10, z: 2174 }, { x: 993, y: -5, z: 2174 }, 20);
            system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea remove Eolienne`
            );
          }, 120);
        }

        if (sceneName_temp === "s_3_1_1") {
          system.runTimeout(() =>
            overworld.runCommandAsync(`scoreboard players set * maison 0`), 22);
          system.runTimeout(() =>
            overworld.runCommandAsync(`scoreboard players set total maison_total 0`), 25);
        }

        if (sceneName_temp === "s_4_1_1") {
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea add 850 -27 1663 890 10 1700 Robot2025_TA`
            );
          });
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea add 1850 -27 663 1890 10 700 Robot2100_TA`
            );
          });
          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 882 -25 1687 859 -25 1665 light_gray_concrete replace glass`),
            30);

          system.runTimeout(() =>
            overworld.runCommandAsync(`/setblock 877 -10 1695 white_concrete`),
            30);

          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 882 -11 1687 859 -11 1665 light_gray_concrete replace glass`),
            30);
          system.runTimeout(() =>
            overworld.runCommandAsync(`/setblock 877 4 1695 white_concrete`),
            30);
          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 882 3 1687 859 3 1665 light_gray_concrete replace glass`),
            30);

          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 857 -9 1690 857 -9 1665 air`),
            30);
          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 857 -23 1690 857 -23 1665 air`),
            30);
          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 859 -23 1663 886 -23 1663 air`),
            30);
          system.runTimeout(() =>
            overworld.runCommandAsync(`/fill 857 5 1690 857 5 1665 air`),
            30);
          robot_init("3");
          robot_init("2");
          robot_init("1");
          system.runTimeout(() =>
            overworld.runCommandAsync(`dialogue change @e[type=operation_future_durable:eko,tag=s_4_1_3] s_4_1_3`),
            30);
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea remove Robot2025_TA`
            );
          }, 100);
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `tickingarea remove Robot2100_TA`
            );
          }, 100);
        }
        if (sceneName_temp === "s_4_6_1") {
          safeClone({ x: 899, y: -13, z: 1697 }, { x: 905, y: -6, z: 1701 }, { x: 899, y: 8, z: 1694 }, 20);

        }
        if (sceneName_temp === "s_5_1_1") {
          safeClone({ x: 959, y: 9, z: 925 }, { x: 959, y: 9, z: 924 }, { x: 958, y: 2, z: 924 }, 20);


          for (let i = 0; i < 5; i++) {
            safeClone({ x: 956, y: -8, z: 928 }, { x: 956, y: -8, z: 928 }, { x: 956, y: -6 + i, z: 928 }, 20 + i);
          }
          safeClone({ x: 956, y: -8, z: 928 }, { x: 956, y: -8, z: 928 }, { x: 956, y: -3, z: 924 }, 20);
          system.runTimeout(() => overworld.runCommandAsync(`fill 955 -6 931 955 0 917 barrier replace redstone_block`), 20);
        }
        if (sceneName_temp === "s_5_2_1") {
          system.runTimeout(() => overworld.runCommandAsync(`fill 971 -6 918 972 -5 928 air`), 20);
          system.runTimeout(() => overworld.runCommandAsync(`fill 971 -7 918 972 -7 928 birch_planks replace redstone_block`), 20);
        }

        // Téléportation de EKO si nécessaire
        if (tpFlag) {
          system.runTimeout(() => {
            const ekos = overworld.getEntities({
              type: "operation_future_durable:eko",
              tags: [sceneName_temp]
            });
            for (const eko of ekos) {
              eko.setDynamicProperty("path_name", undefined);
              eko.setDynamicProperty("path_index", undefined);
              activeEko.delete(eko.id);
              world.sendMessage(`[DEBUG] TP ${eko.id} -> ${sceneName_temp}`);
              overworld.runCommandAsync(
                `tp @e[type=operation_future_durable:eko,tag=${sceneName_temp}] ${x} ${y} ${z} true`
              );
            }
          }, 30);
        }

        // Dialogue
        system.runTimeout(() =>
          overworld.runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=${sceneName_temp}] ${sceneName_temp}`
          ),
          40);

        // Suppression ticking area
        system.runTimeout(() => {
          overworld.runCommandAsync(`tickingarea remove ${sceneName_temp}_TA`);
          world.sendMessage(`[DEBUG] Suppression TA ${sceneName_temp}_TA`);

          // Passer à la scène suivante ou terminer
          if (sceneName_temp === sceneName) {
            world.sendMessage(`[DEBUG] Fin du reset à ${sceneName_temp}`);
          } else {
            processNextScene(index + 1);
          }
        }, 50);
      }, 0);
    }

    // Démarre le traitement en chaîne
    processNextScene(0);
  }

  if (ev.id.startsWith("eko:c")) {
    const sceneName = "s_" + ev.id.split("_").slice(1, 4).join("_");
    const nb_players = world.getPlayers().length;
    const progres_player = progres.getScore("player");  // nombre de joueurs en attente a à checkpoint
    const progres_checkpoint = progres.getScore("checkpoint"); // avancement dans le jeu

    decorator(`Vérification du point de contrôle ${sceneName}`, 1);
    decorator(`${progres_player} joueurs ont validé le point de contrôle sur ${nb_players} joueurs.`, 0);
    if (nb_players <= progres_player) {
      decorator(`Tous les joueurs ont validé le point de contrôle ${sceneName}`, 1);
      system.runTimeout(async () => {
        const cmd = `scriptevent eko:s_${Number(ev.id.split("_")[1])}_${(Number(ev.id.split("_")[2]) + 1)}_1`;
        await world.getDimension("overworld").runCommandAsync(cmd);
      }, 5);
      // Reset du compteur de joueurs au checkpoint

      progres.setScore("player", 0);
      progres.setScore("chapitre", Number(ev.id.split("_")[1]));
      progres.setScore("checkpoint", Number(ev.id.split("_")[2]) + 1);
    }
  }
});


system.runInterval(() => {

  const overworld = world.getDimension("overworld");
  DEBUG = DEBUG_score.getScore("DEBUG") === 1;
  // Faire avancer les Eko sur leur chemin
  for (const eko of overworld.getEntities({
    type: "operation_future_durable:eko"
  })) {
    if (!activeEko.has(eko.id)) continue;

    const sceneName = eko.getDynamicProperty("path_name");
    if (!sceneName) continue;

    const waypoints = paths[sceneName];
    if (!waypoints) continue;

    let index = eko.getDynamicProperty("path_index");
    if (index === undefined) continue;

    const target = waypoints[index];
    if (!target) {
      activeEko.delete(eko.id);
      continue;
    }
    const pos = eko.location;
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    const dz = target.z - pos.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const speed = target.speed || 0.1;
    if (dist < 0.2) {
      eko.setDynamicProperty("path_index", index + 1);
    } else {
      // Calcul de l’angle de rotation (yaw en degrés)
      const yaw = Math.atan2(-dx, dz) * 180 / Math.PI;

      eko.teleport(
        {
          x: pos.x + (dx / dist) * speed,
          y: pos.y + (dy / dist) * speed,
          z: pos.z + (dz / dist) * speed
        },
        {
          dimension: overworld,
          rotation: { x: 0, y: yaw }
        }
      );
    }
  }


  // Vérification que les joueurs restent dans la zone de construction
  if (
    progres.getScore("checkpoint") === 4 &&
    progres.getScore("chapitre") === 2
  ) {
    const players = world.getPlayers();

    players.forEach((player) => {
      const pos = player.location;

      if (pos.x > 963 && pos.x < 1040 && pos.z > 2137 && pos.z < 2220 && pos.y > -7 && pos.y < 50) {
      }
      else {
        decorator(`§c Ne sors pas de la zone, ${player.name} !`, 0);

        system.runTimeout(async () => {
          await world
            .getDimension("overworld")
            .runCommandAsync(`tp "${player.name}" 1004 -5 2172`);
        }, 0);
      }
    });
  }
}, 1);