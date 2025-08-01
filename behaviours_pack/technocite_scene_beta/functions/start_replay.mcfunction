tag @e[tag=cam,tag=s1] add play
tag @e[tag=cam,tag=s2] add play
tag @e[tag=cam,tag=s3] add play
tag @e[tag=cam,tag=s4] add play
tag @e[tag=cam,tag=s5] add play
 
tag @e[name=camPos] add pos1
tp @e[name=camPos] @e[name=point1]
 
execute as @e[tag=cam,tag=!s1,tag=!s2,tag=!s3,tag=!s4,tag=!s5] at @s positioned ~ ~ ~ run say s
 