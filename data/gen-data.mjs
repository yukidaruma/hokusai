import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const inputFile = process.argv[2];
const input = fs
  .readFileSync(inputFile)
  .toString()
  .split('\n')
  .filter((line) => !line.startsWith('#'))
  .join('\n');

const rawData = parse(input, {
  columns: [
    '_timestamp',
    'name',
    'variant',
    'achievement',
    'rule_good_at',
    'rule_bad_at',
    'power_sz',
    'power_tc',
    'power_rm',
    'power_cb',
    'respect',
    'rival',
    'enemy_weapon',
    'memory',
    'comment',
  ],
  from: 0,
  delimiter: ',',
});

const additionalData = {
  'よったん♪': [
    'yottan_spl',
    'https://pbs.twimg.com/profile_images/1527944105736536065/uMBwWmaY_400x400.jpg',
  ],
  あいきょう: [
    'aikyo_0212',
    'https://pbs.twimg.com/profile_images/1295385895168643074/QhUR4dXO_400x400.jpg',
  ],
  'ひじり☆': [
    'Cocutushiziri',
    'https://pbs.twimg.com/profile_images/1569640920764784640/NsT7sFBd_400x400.jpg',
    'UCj0qvnMiSCPcn9TJGGYK_Og',
  ],
  かめむー: [
    'kamem_spl',
    'https://pbs.twimg.com/profile_images/1587376432354729984/YQI2uAJj_400x400.jpg',
    'UCAczcHnZdn34treNGiq0x9g',
  ],
  でっていう: [
    'detteiu_225',
    'https://pbs.twimg.com/profile_images/1569588507202711552/mV56Z6ly_400x400.jpg',
    'UCCzN2oIYVxMuLVyEoMIR0yQ',
  ],
  isa: [
    'isa_hoku',
    'https://pbs.twimg.com/profile_images/1586823186603278336/81a8uvIs_400x400.jpg',
  ],
  ましろまし: [
    'siropiii',
    'https://pbs.twimg.com/profile_images/1579850848938897412/6V-X4HFf_400x400.jpg',
  ],
  すらりん: [
    '_surarinn',
    'https://pbs.twimg.com/profile_images/1456557806178672640/ivhrk4Tb_400x400.jpg',
  ],
  ろり: [
    'naie_77',
    'https://pbs.twimg.com/profile_images/1546049682417147904/-LWCqTmD_400x400.jpg',
  ],
  めいぷる: [
    'meipuru_hoku',
    'https://pbs.twimg.com/profile_images/1508675425161015300/sy83zwTz_400x400.jpg',
  ],
  とらお: [
    'otatora824',
    'https://pbs.twimg.com/profile_images/965562456511627264/D8q32rK7_400x400.jpg',
    'UCegWaeixubhWlwXVrRZxKUw',
  ],
  'ウルフ：ルー': [
    'urufu_ru',
    'https://pbs.twimg.com/profile_images/1560241888850247680/V70NvtfB_400x400.jpg',
  ],
  みーらみあ: [
    'IloveHokusai_8',
    'https://pbs.twimg.com/profile_images/1584189361784225793/lEu5eeD-_400x400.jpg',
    'UC95hCva6YYUyTetCzakVzFQ',
  ],
  おらんじ: [
    'orangina097',
    'https://pbs.twimg.com/profile_images/1543529090925613056/cwLAtvbv_400x400.jpg',
  ],
  ばなな: [
    'banaaana12',
    'https://pbs.twimg.com/profile_images/1213424593794265090/xzLcHhgo_400x400.jpg',
  ],
  ベーコン: [
    'bacan_SS18',
    'https://pbs.twimg.com/profile_images/1483368889237262336/ZE6-4Ky5_400x400.jpg',
  ],
  れいとうビーム: [
    'reitou_beam0902',
    'https://pbs.twimg.com/profile_images/1563860231880425472/ONzFb7OA_400x400.jpg',
    'GwCcIWGAD5ZlD_Z0oWBw',
  ],
  hatti: [
    'hatti527',
    'https://pbs.twimg.com/profile_images/1563859676227375104/bOo__sML_400x400.jpg',
    'UCZPzGZhZcbknCXaJBvjITuQ',
  ],
  えとな: [
    'et7sp',
    'https://pbs.twimg.com/profile_images/1563860140800999426/S1UMiUG__400x400.jpg',
    '%E3%81%88%E3%81%A8%E3%81%AAch',
  ],
  さぺん: [
    'sapepen8608',
    'https://pbs.twimg.com/profile_images/1563859669772386305/ZrNFrIIV_400x400.png',
    'UCSzue7EXLufYbWGxO_akSIA',
  ],
  At: [
    'atoriosika',
    'https://pbs.twimg.com/profile_images/1330507555227897858/6N6mtXMI_400x400.jpg',
    'UC_NfeaSv9if4w6sJBh1VVXw',
  ],
  Redshell1: [
    'redshell15',
    'https://pbs.twimg.com/profile_images/1191373132071878657/q9NkbNTR_400x400.jpg',
    'twitch.tv/redshell1',
  ],
};

const data = rawData.map((player) => {
  const { _timestamp, ...rest } = player;
  const entries = Object.entries(rest).map(([key, value]) => {
    if (key.startsWith('power_')) {
      if (Number.isNaN(Number(value))) {
        value = null;
      } else {
        value = Number(value);
      }
    }
    return [key, value];
  });
  player = Object.fromEntries(entries);
  player.twitter = additionalData[player.name][0];
  player.image = additionalData[player.name][1];
  const stream = additionalData[player.name][2];
  if (stream?.startsWith('twitch.tv')) {
    player.twitch = stream.replace('twitch.tv/', '');
  } else {
    player.youtube = stream;
  }
  return player;
});

const __filename = fileURLToPath(import.meta.url);
fs.writeFileSync(
  path.resolve(path.dirname(__filename), '../src/players.json'),
  JSON.stringify(data, undefined, 2)
);
