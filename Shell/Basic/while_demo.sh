#! /bin/bash

i=1
sum=0
while [ $i -le 10 ]
do
  let sum=sum+$i
  let i++
done

echo $sum
