let atari = 0;
let count = 0;
let gacha100count = 0;
let firstHit = Array(11).fill(0); // 初めて当たりが出たタイミングを記録する配列
let hitsPer100 = Array(7).fill(0); // 1回の100連ガチャでの当たり回数を記録する配列
// 100連ガチャを引く関数
function gacha100() {
  let localAtari = 0; // 1回の100連ガチャでの当たり回数を記録する変数
  let firstHitFlag = false; // 当たりが出たかどうかを記録するフラグ

  for (let i = 0; i < 100; i++) {
    if (Math.random() < 0.01) {
      atari++;
      localAtari++;
      if (!firstHitFlag) {
        firstHit[Math.floor(i / 10)]++; // 初めて当たりが出たタイミングを記録する
        firstHitFlag = true;
      }
    }
    count++;
  }

  if (!firstHitFlag) {
    firstHit[10]++; // 「当たらなかった」カウントを増やす
  }

  if (localAtari >= 6) {
    hitsPer100[6]++;
  } else {
    hitsPer100[localAtari]++;
  }

  gacha100count++;
  document.getElementById('gacha100count').innerHTML = gacha100count;
  updateTables();
}
// テーブルを更新する関数
function updateTables() {
  let firstHitTable = '<tr><th>タイミング</th>';
  for (let i = 1; i <= 10; i++) {
    firstHitTable += `<th>${i * 10 - 9}〜${i * 10}回目</th>`;
  }
  firstHitTable += '<th>当たらなかった</th></tr><tr><td>回数</td>';
  firstHit.forEach(count => {
    firstHitTable += `<td>${count}</td>`;
  });
  firstHitTable += '</tr>';
  document.getElementById('firstHit').innerHTML = firstHitTable;

  let hitsPer100Table = '<tr><th>当たり回数</th>';
  for (let i = 0; i <= 6; i++) {
    hitsPer100Table += `<th>${i === 6 ? '6回以上' : i + '回'}</th>`;
  }
  hitsPer100Table += '</tr><tr><td>回数</td>';
  hitsPer100.forEach(count => {
    hitsPer100Table += `<td>${count}</td>`;
  });
  hitsPer100Table += '</tr>';
  document.getElementById('hitsPer100').innerHTML = hitsPer100Table;
}