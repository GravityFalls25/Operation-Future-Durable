execute as @e[type=armor_stand,tag=start_robot] at @s rotated as @s run summon minecraft:armor_stand ~ ~3 ~ ~ ~
execute as @e[type=armor_stand,tag=start_robot] at @s run tag @e[type=armor_stand,tag=!start_robot,r=3] add as_robot
