execute as @e[type=armor_stand,tag=start_robot] at @s rotated as @s run tp @e[type=armor_stand,tag=as_robot,tag=wrong] ~ ~3 ~ ~ ~
execute at @e[type=armor_stand,tag=pos_0] run tp @e[type=armor_stand,tag=iteration] ~ ~ ~1
execute as @e[type=armor_stand,tag=as_robot,tag=wrong] run tag @s remove wrong