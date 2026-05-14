import { IItem } from '@/types/item';

export const mockGenres = [
  'Hip-Hop', 'R&B', 'Jazz', 'Soul', 'Pop', 'Rock', 'Eletrônico',
  'Indie', 'Lo-fi', 'Funk', 'Reggae', 'MPB', 'Sertanejo', 'Trap',
  'Alternative', 'Afrobeats', 'Drill', 'Neo Soul',
];

export const mockTags = [
  'favorites', 'viagem', 'estudo', 'treino', 'relaxar', 'festa',
  'melancolia', 'euforia', 'clássico', 'novo', 'raro', 'cult',
  'mainstream', 'underground', 'instrumental', 'ao vivo',
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

// Apple Music CDN — via covers.musichoarders.xyz (alta resolução, estável)
const SPTF_BASE = 'https://i.scdn.co/image';
const covers = {
  damn:         'https://a1.mzstatic.com/r40/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg',
  blonde:       'https://a1.mzstatic.com/r40/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg',
  sos:          'https://a1.mzstatic.com/r40/Music122/v4/bd/3b/a9/bd3ba9fb-9609-144f-bcfe-ead67b5f6ab3/196589564931.jpg',
  flowerBoy:    'https://a1.mzstatic.com/r40/Music125/v4/fd/fd/8c/fdfd8c26-b8f9-4768-41d3-b24773250c65/886446605814.jpg',
  unVerano:     'https://a1.mzstatic.com/r40/Music112/v4/3e/04/eb/3e04ebf6-370f-f59d-ec84-2c2643db92f1/196626945068.jpg',
  renaissance:  'https://a1.mzstatic.com/r40/Music112/v4/05/05/f3/0505f338-9873-feb4-af7f-27a470405e5f/196589246974.jpg',
  gnx:          'https://a1.mzstatic.com/r40/Music211/v4/50/c2/cc/50c2cc95-3658-9417-0d4b-831abde44ba1/24UM1IM28978.rgb.jpg',
  chromakopia:  'https://a1.mzstatic.com/r40/Music221/v4/7d/bd/e9/7dbde97e-b97d-8cc3-0203-218b687408a9/196872555059.jpg',
  inRainbows:   'https://a1.mzstatic.com/r40/Music115/v4/08/90/19/08901968-3c48-62a2-8356-83863777d015/634904032401.png',
  currents:     'https://a1.mzstatic.com/r40/Music115/v4/a8/2e/b4/a82eb490-f30a-a321-461a-0383c88fec95/15UMGIM23316.rgb.jpg',
  swimming:     'https://a1.mzstatic.com/r40/Music124/v4/e3/38/b5/e338b529-da3f-b4b9-b8f9-1fae428e7a23/093624905899.jpg',
  channelOrange:'https://a1.mzstatic.com/r40/Music125/v4/04/f8/63/04f863fc-2852-604f-c910-a97ac069506b/12UMGIM40339.rgb.jpg',
  twiceAsTall:  'https://a1.mzstatic.com/r40/Music211/v4/87/9b/4d/879b4d44-ab35-9142-390f-d84cf9c7b179/075679804952.jpg',
  ladrao:       `${SPTF_BASE}/ab67616d00001e02b38bf2feb369d835560a94cf`,
  daLua:       `${SPTF_BASE}/ab67616d00001e02b61aa2db79f020728046b39c`,
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
    genres: ['Reggae', 'Trap', 'Pop'],
    tags: ['festa', 'novo'],
    lists: ['Recomendações'],
    recommendedBy: ['Carla', 'João'],
  },
  {
    id: '6',
    title: 'Renaissance',
    artists: ['Beyoncé'],
    type: 'Álbum',
    coverUrl: covers.renaissance,
    genres: ['Eletrônico', 'Funk', 'R&B'],
    tags: ['festa', 'euforia'],
    lists: ['Recomendações'],
    recommendedBy: ['Beatriz'],
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
