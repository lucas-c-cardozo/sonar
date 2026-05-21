import { IItem } from '@/types/item';

export const mockGenres = [
  'Hip-Hop', 'R&B', 'Jazz', 'Soul', 'Pop', 'Rock', 'Eletrônico',
  'Indie', 'Lo-fi', 'Funk', 'Reggaeton', 'MPB', 'Sertanejo', 'Trap',
  'Alternative', 'Afrobeats', 'Drill', 'Neo Soul',
];

export const mockTags = [
  'Favorites', 'Viagem', 'Estudo', 'Treino', 'Relaxar', 'Festa',
  'Melancolia', 'Euforia', 'Clássico', 'Novo', 'Raro', 'Cult',
  'Mainstream', 'Underground', 'Instrumental', 'Ao vivo',
];

export const mockArtists = [
  'Kendrick Lamar', 'Frank Ocean', 'SZA', 'Tyler, the Creator',
  'Bad Bunny', 'Beyoncé', 'The Weeknd', 'Burna Boy',
  'Anitta', 'Caetano Veloso', 'Gilberto Gil', 'Djonga',
  'BROCKHAMPTON', 'Billie Eilish', 'Lana Del Rey', 'PJ Harvey',
  'Radiohead', 'Tame Impala', 'Mac Miller', 'J. Cole',
];

export const mockRecommenders = [
  'Lucas', 'Ana', 'Pedro', 'Maria', 'João', 'Carla', 'Felipe', 'Beatriz',
];

const PITCH_BASE = 'https://media.pitchfork.com/photos';
const SPTF_BASE = 'https://i.scdn.co/image';
const covers = {
  damn: `${PITCH_BASE}/5929c3e8eb335119a49ed80f/1:1/w_300,c_limit/31d2b6fd.jpg`,
  flowerBoy: `${PITCH_BASE}/59663e05ec814a1a5898c3a3/1:1/w_300,c_limit/tyler-the-creator-flower-boy-cover-1.jpg`,
  chromakopia: `${PITCH_BASE}/671f8c1e86725d26e919a455/1:1/w_300,c_limit/Tyler-the-Creator-Chromakopia.jpg`,
  blonde: `${SPTF_BASE}/ab67616d00001e02c5649add07ed3720be9d5526`,
  sos: `${SPTF_BASE}/ab67616d00001e02bc18bdade69ec5ef0bb25b17`,
  unVerano: `${SPTF_BASE}/ab67616d00001e0249d694203245f241a1bcaa72`,
  renaissance: `${SPTF_BASE}/ab67616d00001e0269a3c061676c2020adfe8315`,
  gnx: `${SPTF_BASE}/ab67616d00001e02e2a0a166493a2bde5480a420`,
  inRainbows: `${SPTF_BASE}/ab67616d00001e02de3c04b5fc750b68899b20a9`,
  currents: `${SPTF_BASE}/ab67616d00001e029e1cfc756886ac782e363d79`,
  swimming: `${SPTF_BASE}/ab67616d00001e02175c577a61aa13d4fb4b6534`,
  channelOrange: `${SPTF_BASE}/ab67616d00001e027aede4855f6d0d738012e2e5`,
  twiceAsTall: `${SPTF_BASE}/ab67616d00001e023478524ed62d216a705c2424`,
  ladrao: `${SPTF_BASE}/ab67616d00001e02b38bf2feb369d835560a94cf`,
  daLua: `${SPTF_BASE}/ab67616d00001e02b61aa2db79f020728046b39c`,
};

export const mockItems: IItem[] = [
  // Em Rotação
  {
    id: '1',
    title: 'DAMN.',
    artists: ['Kendrick Lamar'],
    type: 'Álbum',
    coverUrl: covers.damn,
    genres: ['Hip-Hop', 'Trap'],
    tags: ['favorites', 'clássico'],
    lists: ['Em Rotação'],
    recommendedBy: ['Lucas'],
  },
  {
    id: '2',
    title: 'Blonde',
    artists: ['Frank Ocean'],
    type: 'Álbum',
    coverUrl: covers.blonde,
    genres: ['R&B', 'Neo Soul', 'Alternative'],
    tags: ['favorites', 'melancolia', 'cult'],
    lists: ['Em Rotação'],
    recommendedBy: ['Ana', 'Pedro'],
  },
  {
    id: '3',
    title: 'SOS',
    artists: ['SZA'],
    type: 'Álbum',
    coverUrl: covers.sos,
    genres: ['R&B', 'Pop', 'Neo Soul'],
    tags: ['favorites', 'novo'],
    lists: ['Em Rotação', 'Recomendações'],
    recommendedBy: ['Maria'],
  },

  // Recomendações
  {
    id: '4',
    title: 'Flower Boy',
    artists: ['Tyler, the Creator'],
    type: 'Álbum',
    coverUrl: covers.flowerBoy,
    genres: ['Hip-Hop', 'Indie', 'Pop'],
    tags: ['cult', 'melancolia'],
    lists: ['Recomendações'],
    recommendedBy: ['Felipe'],
  },
  {
    id: '5',
    title: 'Un Verano Sin Ti',
    artists: ['Bad Bunny'],
    type: 'Álbum',
    coverUrl: covers.unVerano,
    genres: ['Reggaeton', 'Trap', 'Pop'],
    tags: ['festa', 'novo'],
    lists: [],
    recommendedBy: [],
  },
  {
    id: '6',
    title: 'Renaissance',
    artists: ['Beyoncé'],
    type: 'Álbum',
    coverUrl: covers.renaissance,
    genres: ['Eletrônico', 'Funk', 'R&B'],
    tags: ['festa', 'euforia'],
    lists: [],
    recommendedBy: [],
  },

  // Lançamentos Recentes
  {
    id: '7',
    title: 'GNX',
    artists: ['Kendrick Lamar'],
    type: 'Álbum',
    coverUrl: covers.gnx,
    genres: ['Hip-Hop', 'Trap', 'Alternative'],
    tags: ['novo', 'favorites'],
    lists: ['Lançamentos Recentes'],
  },
  {
    id: '8',
    title: 'Chromakopia',
    artists: ['Tyler, the Creator'],
    type: 'Álbum',
    coverUrl: covers.chromakopia,
    genres: ['Hip-Hop', 'Neo Soul', 'Alternative'],
    tags: ['novo', 'euforia'],
    lists: ['Lançamentos Recentes'],
    recommendedBy: ['Lucas'],
  },
  {
    id: '9',
    title: 'da lua',
    artists: ['Djonga', 'Veigh', 'LISBOA'],
    coverUrl: covers.daLua,
    type: 'Single',
    genres: ['Hip-Hop', 'MPB'],
    tags: ['novo', 'underground'],
    lists: ['Lançamentos Recentes'],
  },

  // Lista de Desejos
  {
    id: '10',
    title: 'In Rainbows',
    artists: ['Radiohead'],
    type: 'Álbum',
    coverUrl: covers.inRainbows,
    genres: ['Rock', 'Alternative', 'Eletrônico'],
    tags: ['clássico', 'cult', 'melancolia'],
    lists: ['Lista de Desejos'],
    recommendedBy: ['Pedro'],
  },
  {
    id: '11',
    title: 'Currents',
    artists: ['Tame Impala'],
    type: 'Álbum',
    coverUrl: covers.currents,
    genres: ['Rock', 'Eletrônico', 'Indie'],
    tags: ['clássico', 'relaxar'],
    lists: ['Lista de Desejos'],
  },
  {
    id: '12',
    title: 'Swimming',
    artists: ['Mac Miller'],
    type: 'Álbum',
    coverUrl: covers.swimming,
    genres: ['Hip-Hop', 'Neo Soul', 'Jazz'],
    tags: ['melancolia', 'favorites', 'cult'],
    lists: ['Lista de Desejos'],
    recommendedBy: ['Ana'],
  },

  // Ouvidos
  {
    id: '13',
    title: 'channel ORANGE',
    artists: ['Frank Ocean'],
    type: 'Álbum',
    coverUrl: covers.channelOrange,
    genres: ['R&B', 'Soul', 'Pop'],
    tags: ['clássico', 'favorites'],
    lists: ['Ouvidos'],
    recommendedBy: ['Maria', 'Felipe'],
  },
  {
    id: '14',
    title: 'Ladrão',
    artists: ['Djonga'],
    type: 'Álbum',
    coverUrl: covers.ladrao,
    genres: ['Hip-Hop', 'Trap', 'MPB'],
    tags: ['underground', 'cult'],
    lists: ['Ouvidos'],
  },
  {
    id: '15',
    title: 'Twice as Tall',
    artists: ['Burna Boy'],
    type: 'Álbum',
    coverUrl: covers.twiceAsTall,
    genres: ['Afrobeats', 'R&B'],
    tags: ['novo', 'relaxar'],
    lists: ['Ouvidos'],
    recommendedBy: ['João'],
  },
];
