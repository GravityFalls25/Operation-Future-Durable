execute as @e[type=armor_stand,tag=iteration] at @s rotated as @s run tp @s ^ ^ ^1
function detect_bloc

execute as @e[type=armor_stand,tag=iteration] at @s run function error_robot

execute if entity @e[type=armor_stand,tag=as_robot,tag=!wrong] run schedule delay add chain 1S append
execute if entity @e[type=armor_stand,tag=as_robot,tag=wrong] run function error_action



