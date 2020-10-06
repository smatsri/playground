export const blocksIndexs: number[][] = [];

for (let i = 0; i < 9; i++) {
  let block = [];
  let s = ~~(i / 3);
  for (let j = 0; j < 9; j++) {
    let r = ~~(j / 3);
    let index = s * 27 + (i % 3) * 3 + 9 * r + (j % 3);
    block.push(index);
  }

  blocksIndexs.push(block);
}

export const getAvailable = (pazzle: number[], index: number) => {
  const arr: number[] = [];
  let colIndex = index % 9;
  let rowIndex = ~~(index / 9);
  let blockIndex = ~~(rowIndex / 3) * 3 + ~~(colIndex / 3);
  for (let r = 0; r < 9; r++) {
    let i = r * 9 + colIndex;
    arr.push(pazzle[i]);
  }

  for (let r = 0; r < 9; r++) {
    let i = r + rowIndex * 9;
    arr.push(pazzle[i]);
  }

  for (let r = 0; r < 9; r++) {
    let i = blocksIndexs[blockIndex][r];
    arr.push(pazzle[i]);
  }

  const existing = arr.filter(a => !!a);

  const ret = Array(9)
    .fill(0)
    .map((_, i) => i + 1)
    .filter(n => !existing.includes(n));
  return ret;
};

export const defaultAvailable = Array(81)
  .fill(0)
  .map(_ =>
    Array(81)
      .fill(0)
      .map((_, i) => i + 1)
  );
