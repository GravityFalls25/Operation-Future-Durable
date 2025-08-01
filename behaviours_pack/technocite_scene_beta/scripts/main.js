import { world, system, DynamicPropertiesDefinition } from "@minecraft/server";

// ✅ Définir une propriété persistante
world.afterEvents.worldInitialize.subscribe(e => {
  const def = new DynamicPropertiesDefinition();
  def.defineNumber("cinematic_step");
  e.propertyRegistry.registerWorldDynamicProperties(def);
});

// ✅ Exemple : une trajectoire simple
let path = [
  { x: 0, y: 70, z: 0 },
  { x: 10, y: 72, z: 10 },
  { x: 20, y: 70, z: 0 }
];

let segment = 0;
let t = 0;
let duration = 200; // ticks pour chaque segment

system.runInterval(() => {
  const player = world.getPlayers()[0];
  if (!player) return;

  let currentStep = world.getDynamicProperty("cinematic_step") ?? 0;

  if (currentStep === 0) {
    // Démarre la cinématique
    segment = 0;
    t = 0;
    world.setDynamicProperty("cinematic_step", 1);
  }

  if (currentStep === 1) {
    // Déplacer le joueur
    if (segment >= path.length - 1) {
      world.setDynamicProperty("cinematic_step", 2);
      return;
    }

    t += 1 / duration;
    if (t > 1) {
      t = 0;
      segment++;
    }

    let A = path[segment];
    let B = path[segment + 1];

    let x = A.x + (B.x - A.x) * t;
    let y = A.y + (B.y - A.y) * t;
    let z = A.z + (B.z - A.z) * t;

    player.teleport({ x: x, y: y, z: z });
  }

  if (currentStep === 2) {
    // Cinématique terminée
    player.sendMessage("🎉 Cinématique terminée !");
    // Remets à zéro pour rejouer
    world.setDynamicProperty("cinematic_step", 0);
  }

}, 1);
