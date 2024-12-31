What relative probability would a Catoblepas have for appearing in a given area, given a standard heroic fantasy campaign. The available regions are: 'arctic', 'coastal', 'cursed', 'desert', 'dungeon', 'forest', 'grassland', 'hill', 'mountain', 'swamp', 'underdark', 'underwater' & 'urban'. Give a concise answer in the following sample format:

```
areas: [
  { area: 'dungeon', probability: 0.2 },
  { area: 'cursed', probability: 0.15 },
  { area: 'swamp', probability: 0.05 },
  { area: 'underdark', probability: 0.05 },
  { area: 'urban', probability: 0.01 },
],
```

If the probability value is <= 0.01, disregard the row, and sort the rows by probability. Follow this up with a plaintext explanation for why.

Then, provide a disposition score in the following format:

```
predisposition: {
  distant: -30,
  nearby: -50,
},
```

Where `distant` corresponds to how likely this enemy is to attack from a distance, and `nearby` is how likely from afar. A score of -50 is very likely to attack, and a score of 50 is very unlikely. 0 is neutral.

And finally, is this creature likely to ally with others creatures or to work alone? If it allies with other creatures, what other creatures?
