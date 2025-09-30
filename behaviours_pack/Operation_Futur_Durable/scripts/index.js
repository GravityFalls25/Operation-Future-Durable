import { system, world, ItemStack } from "@minecraft/server";

// Message au lancement

world.sendMessage("[DEBUG] Script chargé ! (22/09");

const playersReady = new Set();




// Garde les differents scores des scoreboards
const progres = world.scoreboard.getObjective("progres");
const maison_total = world.scoreboard.getObjective("maison_total");

const cinematic = {
  "futur_1": {
    area: [
      { x: 1151, y: -14, z: -471 },  // coin 1
      { x: 711, y: 108, z: 264 }    // coin 2
    ],
    path: [
      { x: 1144, y: 55, z: -62, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 1077, y: 64, z: -213, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "present_1": {
    area: [
      { x: 1151, y: -14, z: 1529 },  // coin 1
      { x: 711, y: 108, z: 2264 }    // coin 2
    ],
    path: [
      { x: 1144, y: 55, z: 1938, rot: { x: 16.1, y: 39 }, speed: 2 },
      { x: 1077, y: 64, z: 1787, rot: { x: 21.4, y: 109.1 }, speed: 30 }
    ]
  },
  "water_cleaning": {
    area: [
      { x: 900, y: 0, z: 1600 },  // coin 1
      { x: 1000, y: 30, z: 1800 }    // coin 2
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
  "s_4_6_1": [false, { x: 899, y: -13, z: 1697, speed: 0.3 },
    { x: 905, y: -6, z: 1701, speed: 0.3 }
  ],
  "s_4_8_1": [false, { x: 1000.5, y: -8, z: 900.5, speed: 0.3 },
    { x: 992.5, y: -7, z: 910.5, speed: 0.2 },
    { x: 980.5, y: -7, z: 932.5, speed: 0.3 },
    { x: 978.5, y: -6, z: 934.5, speed: 0.3 },
    { x: 974.5, y: -6, z: 937.5, speed: 0.3 },
    { x: 969.5, y: -6, z: 935.5, speed: 0.3 },
    { x: 968.5, y: -6, z: 926.5, speed: 0.3 }],
  "s_5_1_1": [false, { x: 956.5, y: -30, z: 926.5, speed: 0.3 },
    { x: 970.5, y: 30, z: 9117.5, speed: 0.3 }]

};

let activeEko = new Set();

const overworld = world.getDimension("overworld");
const players = world.getPlayers();

function followPath(sceneName) {
  world.sendMessage(`[DEBUG] Activation du chemin ${sceneName}`);
  for (const eko of overworld.getEntities({
    type: "operation_future_durable:eko",
    tags: [sceneName]
  })) {
    eko.setDynamicProperty("path_name", sceneName);
    eko.setDynamicProperty("path_index", 1);
    activeEko.add(eko.id);
  }
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
function robot_iterate(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    // déplace l’armor_stand “iteration” vers l’avantz
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s run tp @s ^ ^ ^1`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s run setblock ^-2 ^-2 ^-1 redstone_block`);
    // ensuite on envoie la détection

    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_detect`);
  }, 5);

}

function robot_detect(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ diamond_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s rotated as @s run tp @s ^ ^ ^1`);

    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ diamond_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s rotated as @s run tp @s ^ ^ ^1`);

    // Lapis : tourner -90
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ lapis_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s run tp @s ~ ~ ~ ~-90 ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ lapis_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s run tp @s ~ ~ ~ ~-90 ~`);

    // Émeraude : tourner +90
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ emerald_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s run tp @s ~ ~ ~ ~90 ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ emerald_block run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2100] at @s run tp @s ~ ~ ~ ~90 ~`);

    // Air : Fini
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] at @s rotated as @s if block ^-2 ^ ^ air run execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] run tag @s add wrong`);

    // Vérifie l’erreur de position
    await dim.runCommandAsync(`scriptevent eko:a_3_${lvl}_checkerror`);
  }, 5);
}

function robot_checkerror(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s unless block ~ ~-1 ~ red_concrete run tag @s add wrong`);
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ yellow_concrete run tag @s add succes`);
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ red_concrete run fill ~ ~1 ~ ~ ~4 ~ glass replace light_gray_concrete`);
    await dim.runCommandAsync(`execute as @e[type=operation_future_durable:eko_controlled,tag=t_2025] at @s if block ~ ~-1 ~ yellow_concrete run fill ~ ~1 ~ ~ ~4 ~ glass replace light_gray_concrete`);
    // planifie la prochaine itération ou la gestion d’erreur

    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=!wrong,tag=!²stopped,tag=!succes] run scriptevent eko:a_3_${lvl}_iterate`);
    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=wrong, tag=!succes] run scriptevent eko:a_3_${lvl}_error`);
    await dim.runCommandAsync(`execute if entity @e[type=operation_future_durable:eko_controlled,tag=t_2025,tag=succes] run scriptevent eko:a_3_${lvl}_succes`);
  }, 5); // 20 ticks = 1 s
}
function robot_error(lvl) {
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
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
    world.sendMessage(`[DEBUG] Erreur du robot niveau ${lvl}`);

  }, 8);

}

function robot_init(lvl) {
  world.sendMessage(`[DEBUG] Initialisation du robot niveau ${lvl}`);
  system.runTimeout(async () => {
    const dim = world.getDimension("overworld");
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=start_robot,tag=ex_${lvl},tag=t_2025] at @s rotated as @s run tp @e[type=operation_future_durable:eko_controlled,tag=t_2025] ^ ^ ^5 ~ ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=start_robot,tag=ex_${lvl},tag=t_2100] at @s rotated as @s run tp @e[type=operation_future_durable:eko_controlled,tag=t_2100] ^ ^ ^5 ~ ~`);
    await dim.runCommandAsync(`execute as @e[type=armor_stand,tag=pos_0,tag=ex_${lvl}] at @s rotated as @s run tp @e[type=armor_stand,tag=iteration,tag=ex_${lvl}] ~ ~ ~-1 ~ ~`);
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove stopped`);
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove succes`);
    await dim.runCommandAsync(`tag @e[type=operation_future_durable:eko_controlled,tag=t_2025] remove wrong`);
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
  world.sendMessage(`[DEBUG] Succès du robot niveau ${lvl}`);

  system.runTimeout(async () => {
    if (lvl == "1") {
      await dim.runCommandAsync(`setblock 858 4 1695 blue_concrete`);
      await dim.runCommandAsync(`setblock 877 4 1695 redstone_block`);
      world.sendMessage(`<Eko>: Niveau ${lvl} terminé, descend à l'étage du dessous pour continuer !`);
      dialogue("s_4_2_1", 5);
      dialogue("s_4_3_1", 5);

    }
    else if (lvl == "2") {
      await dim.runCommandAsync(`setblock 858 -10 1695 blue_concrete`);
      await dim.runCommandAsync(`setblock 877 -10 1695 redstone_block`);
      world.sendMessage(`<Eko>: Niveau ${lvl} terminé, descend à l'étage du dessous pour continuer !`);
      dialogue("s_4_4_1", 5);
      dialogue("s_4_5_1", 5);
    }
    else if (lvl == "3") {
      await dim.runCommandAsync(`setblock 858 -23 1695 blue_concrete`);
      dim.runCommandAsync(`scriptevent eko:s_4_6_1`);

    }
  }, 1);
  if (lvl == "3") {
    world.sendMessage("<Eko>: Félicitations ! J'ai atteint le bout de la canalisation, c'est réussi !");
  }
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

function load_zone(zone) {
  const dim = world.getDimension("overworld");

  const coords = cinematic[zone];
  if (!coords) {
    world.sendMessage(`[ERREUR] La zone '${zone}' n'existe pas.`);
    return;
  }

  const area = coords.area;
  if (!area || area.length !== 2) {
    world.sendMessage(`[ERREUR] La zone '${zone}' n'a pas deux coins valides.`);
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
    world.sendMessage(`[INFO] Ticking area '${name}' chargée.`);
  }).catch(err => {
    world.sendMessage(`[ERREUR] Impossible de créer la ticking area: ${err}`);
  });
}

function unload_zone(zone) {
  const dim = world.getDimension("overworld");
  const name = `${zone}_TA`;

  // Suppression de la ticking area
  dim.runCommandAsync(`tickingarea remove ${name}`).then(() => {
    world.sendMessage(`[INFO] Ticking area '${name}' déchargée.`);
  }).catch(err => {
    world.sendMessage(`[ERREUR] Impossible de supprimer la ticking area: ${err}`);
  });
}
function addItemToChest(itemType, amount = 20, emballage = false, outil = false) {
  const dim = world.getDimension("overworld");

  const checks = [
    {
      name: "Coffre test",
      pos: { x: 958, y: 2, z: 925 }
    },
  ];

  for (const check of checks) {
    const block = dim.getBlock(check.pos);
    world.sendMessage(`Vérification de ${check.name}...`);

    if (!block || block.typeId !== "minecraft:chest") {
      player.runCommand(`/say Coffre manquant à ${JSON.stringify(check.pos)} !`);
      continue;
    }

    const inventory = block.getComponent("minecraft:inventory");
    if (!inventory) {
      player.runCommand(`/say ${check.name} n'a pas d'inventaire !`);
      continue;
    }
    world.sendMessage(`DEBUG: ${check.name} a un inventaire de taille ${inventory.container.size}`);
    const container = inventory.container;


    const itemsToAdd = amount;
    let added = false;
    let added_emballage = !emballage;
    let added_outil = !outil;
    world.sendMessage(`DEBUG: added_plastique initialisé à ${added_emballage}`);
    world.sendMessage(`DEBUG: added_outil initialisé à ${added_outil}`);

    // 1. Cherche une pile de pommes avec moins de 44
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);

      if (item && item.typeId === itemType && item.amount < 44) {
        const newAmount = Math.min(item.amount + itemsToAdd, 64);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added = true;

        world.sendMessage(`DEBUG: Ajouté ${itemsToAdd} ${itemType} au slot ${slotIndex}`);
        break;
      }

    }
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);
      if (item && item.typeId === "operation_future_durable:emballage" && item.amount < 63 && emballage) {
        const newAmount = Math.min(item.amount + 1, 64);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added_emballage = true;
        world.sendMessage(`DEBUG: Ajouté 1 emballage au slot ${slotIndex}`);
        break;
      }
    }
    for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
      const item = container.getItem(slotIndex);
      if (item && item.typeId === "operation_future_durable:vis" && item.amount < 63 && outil) {
        const newAmount = Math.min(item.amount + 1, 2);
        item.amount = newAmount;
        container.setItem(slotIndex, item);
        added_outil = true;
        world.sendMessage(`DEBUG: Ajouté 1 vis au slot ${slotIndex}`);
        break;
      }
    }
    world.sendMessage(`DEBUG:aaaa Après ajout, ${check.name} a maintenant ${container.size} slots`);
    // 2. Sinon, cherche un slot vide
    if (!added) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        world.sendMessage(`DEBUG: Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`);
        if (!item) {
          world.sendMessage(`DEBUG: Trouvé slot vide à l'index ${slotIndex}`);
          world.sendMessage(`DEBUG: Création de la pile ${itemType} x${itemsToAdd}`);
          container.setItem(slotIndex, new ItemStack(itemType, itemsToAdd));
          world.sendMessage(`DEBUG: Ajouté ${itemsToAdd} ${itemType} au slot vide ${slotIndex}`);
          added = true;
          break;
        }
      }
    }
    if (!added_emballage) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        world.sendMessage(`DEBUG: Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`);
        if (!item) {
          world.sendMessage(`DEBUG: Trouvé slot vide à l'index ${slotIndex}`);
          world.sendMessage(`DEBUG: Création de la pile operation_future_durable:emballage x 1`);
          container.setItem(slotIndex, new ItemStack("operation_future_durable:emballage", 1));
          world.sendMessage(`DEBUG: Ajouté 1 operation_future_durable:emballage au slot vide ${slotIndex}`);
          added_emballage = true;
          break;
        }
      }
    }
    if (!added_outil) {
      for (let slotIndex = 0; slotIndex < container.size; slotIndex++) {
        const item = container.getItem(slotIndex);
        world.sendMessage(`DEBUG: Slot ${slotIndex} contient ${item ? item.typeId + ' x' + item.amount : 'rien'}`);
        if (!item) {
          world.sendMessage(`DEBUG: Trouvé slot vide à l'index ${slotIndex}`);
          world.sendMessage(`DEBUG: Création de la pile operation_future_durable:vis x 1`);
          container.setItem(slotIndex, new ItemStack("operation_future_durable:vis", 1));
          world.sendMessage(`DEBUG: Ajouté 1 operation_future_durable:vis au slot vide ${slotIndex}`);
          added_outil = true;
          break;
        }
      }
    }
    world.sendMessage(`DEBUG: Après ajout, ${check.name} a maintenant ${container.size} slots`);
    if (!added) {
      world.sendMessage(`DEBUG: Pas de place pour ajouter ${itemsToAdd} ${itemType} dans ${check.name}`);
    }
  }
}

function cinematics(zoneName, wait) {
  const zoneData = cinematic[zoneName];
  if (!zoneData) {
    world.sendMessage(`[ERREUR] Zone '${zoneName}' introuvable`);
    return;
  }
  world.sendMessage(`[DEBUG] Démarrage de la cinématique '${zoneName}'`);

  // 1️⃣ Charger la zone
  //load_zone(zoneName, zoneData.area);

  const path = zoneData.path;
  if (!path || path.length === 0) return;

  let totalTime = wait; // cumul du temps pour les runTimeout

  // 2️⃣ Parcourir les points du path
  path.forEach((step, index) => {
    const pos = step;
    const rot = step.rot || { x: 0, y: 0 };
    world.sendMessage(`[DEBUG] Point ${index}: x:${pos.x} y:${pos.y} z:${pos.z} rotX:${rot.x} rotY:${rot.y}`);
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

    if (zoneName === "water_cleaning") {
      system.runTimeout(async () => {
        const dim = world.getDimension("overworld");
        await dim.runCommandAsync(`fill 900 15 1693 905 7 1698 air replace lime_stained_glass`);
      }, 100);
      world.sendMessage(`[DEBUG] Clear eau`);
    }
  });

  system.runTimeout(async () => {

    await world.getDimension("overworld").runCommandAsync(`camera @a fade time 0.5 0.5 1 color 0 0 0`);
  }, totalTime + 8);
  // 3️⃣ Clear camera à la fin
  system.runTimeout(async () => {

    await world.getDimension("overworld").runCommandAsync(`camera @a clear`);
    world.sendMessage(`[DEBUG] Fin de la cinématique '${zoneName}'`);
  }, totalTime + 20);

  // 4️⃣ Décharger la zone 1 minute plus tard
  // system.runTimeout(() => {
  //   unload_zone(zoneName);
  // }, 20 * 60 * 1);
}


world.afterEvents.itemUse.subscribe((event) => {
  if (
    event.itemStack &&
    ["minecraft:carrot", "minecraft:egg", "minecraft:beef", "minecraft:chicken", 'minecraft:apple', "minecraft:bread", "minecraft:salmon", "minecraft:potato"]
      .includes(event.itemStack.typeId)
  ) {
    event.cancel = true;
  }
  // Vérifie que c’est bien un bâton
  if (event.itemStack?.typeId === "minecraft:stick") {
    event.cancel = true;

    system.run(() => {
      const player = event.source;            // le joueur qui a cliqué
      const pos = player.location;            // position XYZ
      const rot = player.getRotation();       // { x: pitch, y: yaw }

      world.sendMessage(
        `[DEBUG] ${player.name} a cliqué avec un bâton à ` +
        `x:${pos.x.toFixed(1)} y:${pos.y.toFixed(1)} z:${pos.z.toFixed(1)} ` +
        `(pitch:${rot.x.toFixed(1)} yaw:${rot.y.toFixed(1)})`
      );
    });
  }
  else if (event.itemStack?.typeId === "minecraft:totem_of_undying") {
    event.cancel = true
    world.sendMessage("<EKO> : Ah, te revoilà ! Prêt pour une nouvelle aventure ?");
    system.runTimeout(async () => {
      const dim = world.getDimension("overworld");

      await dim.runCommandAsync(`dialogue open @e[type=npc,x=-10,y=40,z=-10,dx=10,dy=60,dz=10] @a s_0_0_0`);
    });

  }
});



// world.afterEvents.playerJoin.subscribe(({ playerId, playerName }) => {
//   world.sendMessage(
//     `Player ${playerName} (${playerId}) has just joined the world.`
//   );

//   // --- Attendre 2 secondes avant de faire les vérifications ---
//   system.runTimeout(() => {
//     const yet_connected = world.scoreboard.getObjective("yet_connected");
//     world.sendMessage(`[DEBUG] Objectif yet_connected : ${yet_connected ? "OK" : "NOK"}`);

//     let is_yet_connected = 0; // valeur par défaut

//     // --- Sécurisation de la lecture du score ---
//     try {
//       // getScore peut lancer une exception si aucun score n’existe
//       is_yet_connected = yet_connected.getScore(playerName);
//     } catch (err) {
//       world.sendMessage(`§c[WARN] Impossible de lire le score de ${playerName} : ${err}`);
//       is_yet_connected = 0;
//     }

//     world.sendMessage(`[DEBUG] Score yet_connected de ${playerName} : ${is_yet_connected}`);

//     const dim = world.getDimension("overworld");
//     if (is_yet_connected === 0) {
//       system.runTimeout(async () => {
//         await dim.runCommandAsync(`scoreboard players set "${playerName}" yet_connected 1`);
//       }, 10);

//       // Donne le totem
//       system.runTimeout(async () => {
//         await dim.runCommandAsync(`give "${playerName}" minecraft:totem_of_undying 1`);
//         world.sendMessage(`§a[INFO] Totem donné à ${playerName}.`);
//       }, 0);
//     }
//   }, 200); // 40 ticks ≈ 2 secondes
// });



// --- Gestion des events ---
system.afterEvents.scriptEventReceive.subscribe(ev => {

  // Vérifie que l'id commence bien par "eko:a_"
  if (ev.id.startsWith("eko:a")) {
    if (ev.id.split("_")[1] == "2") {
      const scoreName = ev.id.split("_")[2];
      world.sendMessage(`[DEBUG] +1 au scoreboard ${scoreName}`);

      system.runTimeout(async () => {
        const dim = world.getDimension("overworld");

        await dim.runCommandAsync(`scoreboard players set ${scoreName} maison 1`);
        await dim.runCommandAsync(`scoreboard players reset total maison`);
        await dim.runCommandAsync(`scoreboard players set total maison_total 0`);
        await dim.runCommandAsync(`scoreboard players operation total maison_total += * maison`);

        // Vérifie le score total APRÈS la mise à jour
        const obj = world.scoreboard.getObjective("maison_total");
        const totalScore = obj.getScore("total") ?? 0;

        if (totalScore >= 6) {
          world.sendMessage("<EKO> : Bravo ! Vous avez trouvé tous les éléments problématique de la maison. Reviens me voir !");
          await dim.runCommandAsync(`dialogue change @e[type=operation_future_durable:eko,tag=s_3_3_1] s_3_3_1`);
          await dim.runCommandAsync(`scoreboard players set checkpoint progres 3`);
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
    world.sendMessage(`[DEBUG] Démarrage de scene ${sceneName}`);
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
            `camera @a fade time 0.5 2 2.5 color 0 0 0`
          );
        }, 1);

        tpPlayersDispersed({ x: 123.5, y: -1.2, z: 1785 }, 75, 10, 1);
        dialogue(sceneName, 170);

        [120, 125, 130].forEach(delay => { // 0.5s d’écart (20 ticks = 1s)
          system.runTimeout(async () => {
            await world.getDimension("overworld").runCommandAsync(
              `playsound mob.zombie.wood @a ${paths["s_1_2_1"][1].x} ${paths["s_1_2_1"][1].y} ${paths["s_1_2_1"][1].z} 0.5 3`
            );
          }, delay);
          world.sendMessage(`[DEBUG] Son de pas dans ${delay} ticks`);
        });

      }
        break;
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
      }
        break;
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

      }
        break;
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


      }
        break;
      case "s_1_6_1": {
        followPath(sceneName); // droite
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_6_1] s_1_6_1`
          );
        }, 10);

      }
        break;
      case "s_1_7_1": {
        followPath(sceneName); //labyrinthe
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_7_1] s_1_7_1`
          );
        }, 10);

      }
        break;
      case "s_1_8_1": {
        followPath(sceneName); //labyrinthe
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `dialogue change @e[type=operation_future_durable:eko,tag=s_1_8_1] s_1_8_1`
          );
        }, 10);

      }
        break;
      case "s_1_9_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        tpPlayersDispersed({ x: 215.5, y: -12, z: 1715.5 }, 75, 20, 1);
        dialogue(sceneName, 100, "scientifique");
      }

        break;
      case "s_1_10_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);

        cinematics("futur_1", 35);
        tpPlayersDispersed({ x: 958.5, y: -7, z: 53.5 }, 305, 15, 2);
        dialogue(sceneName, 650);
      }
        break;
      case "s_2_1_1": {
        followPath(sceneName);
        dialogue(sceneName, 400);
      }
        break;
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
      }
        break;
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


      }
        break;
      case "s_2_4_1": {
        dialogue(sceneName, 50);


      }
        break;
      case "s_2_4_2": {
        dialogue(sceneName, 12);
      }
        break;
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
        tpPlayersDispersed({ x: 2007, y: -7, z: 57 }, 0, 20, 2);
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 5);
        dialogue(sceneName, 100);

      }
        break;
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
      }
        break;
      case "s_3_1_1": {
        dialogue(sceneName, 12);
      }
        break;
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
      }
        break;
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
        tpPlayersDispersed({ x: 2049, y: -7, z: 943 }, 220, 20, 2);
        dialogue(sceneName, 70);
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
        dialogue(sceneName, 400);
        break;

      }
      case "s_4_1_1": {
        followPath(sceneName);
        dialogue(sceneName, 200);
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
        break;

      }

      case "s_4_7_1": {
        system.runTimeout(async () => {
          await world.getDimension("overworld").runCommandAsync(
            `camera @a fade time 0.5 1.5 2.5 color 0 0 0`
          );
        }, 10);
        tpPlayersDispersed({ x: 1002.5, y: -8.00, z: 903.5 }, 157, 100, 2);
        dialogue(sceneName, 200);
        break;

      }
      case "s_4_8_1": {
        followPath(sceneName);
        dialogue(sceneName, 200);
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

    /** Traitement d'une scène après l'autre */
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
      system.runTimeout(() => {
        overworld.runCommandAsync(
          `tickingarea add ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${sceneName_temp}_TA`
        );

        if (sceneName_temp === "s_1_2_1") {
          system.runTimeout(() =>
            overworld.runCommandAsync(`setblock 117 -2 1785 birch_door`),
            20);
        }

        if (sceneName_temp === "s_3_1_1") {
          system.runTimeout(() =>
            overworld.runCommandAsync(`scoreboard players set * maison 0`), 22);
          system.runTimeout(() =>
            overworld.runCommandAsync(`scoreboard players set total maison_total 0`), 25);
        }

        if (sceneName_temp === "s_4_1_1") {
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
        }
        if (sceneName_temp === "s_4_6_1") {
          system.runTimeout(() =>
            overworld.runCommandAsync(`clone 899 -13 1697 905 -6 1701 899 8 1694`)
          );
        }
        if( sceneName_temp === "s_5_1_1"){
          system.runTimeout(() => overworld.runCommandAsync(`clone 959 9 925 959 9 924 958 2 924`));

        for (let i = 0; i < 5; i++) {
          system.runTimeout(() => {
            overworld.runCommandAsync(
              `clone 956 -8 928 956 -8 928 956 ${-6 + i} 928`
            );
            world.sendMessage(`[DEBUG] clone 956 ${-6 + i} 928`);
          }, i + 2); // petit décalage pour éviter tout en même tick
        }
        system.runTimeout(() => overworld.runCommandAsync(`clone 956 -8 928 956 -8 928 956 -3 924`));
      }

        // Téléportation si nécessaire
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

    world.sendMessage(`[DEBUG] Vérification du point de contrôle ${sceneName}`);
    world.sendMessage(`[DEBUG] ${progres_player} joueurs ont validé le point de contrôle sur ${nb_players} joueurs.`);
    if (nb_players <= progres_player) {
      world.sendMessage(`[DEBUG] Tous les joueurs ont validé le point de contrôle ${sceneName}`);
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
        world.sendMessage(`Ne sors pas de la zone, ${player.name} !`);

        system.runTimeout(async () => {
          await world
            .getDimension("overworld")
            .runCommandAsync(`tp "${player.name}" 1004 -5 2172`);
        }, 0);
      }
    });
  }
}, 1);