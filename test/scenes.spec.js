import { scenesFromDialogs } from '../src/scenes';

describe('scenesFromDialogs()', () => {
    it('should create empty scenes from empty dialogs', () => {
        const dialogs = [];
        const scenes = scenesFromDialogs(dialogs);

        expect(scenes).toEqual([]);
    });

    it('should handle BG from dialogs', () => {
        const dialogs = [
            {
                content: [
                    '[Background(image="bg_black",screenadapt="showall")]',
                    '[Delay(time=1)]',
                    '[Subtitle(text="Great Kjeragandr, we walk beside Her.", x=300, y=370, alignment="center", size=24, delay=0.04, width=700)]',
                    '[Background(image="24_g13_mountpath_s", screenadapt="coverall", block=true)]',
                    '[Delay(time=1)]',
                ],
            }
        ];
        const scenes = scenesFromDialogs(dialogs);
        const expected = [
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Delay', time: '1' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Subtitle', text: 'Great Kjeragandr, we walk beside Her.', x: '300', y: '370', alignment: 'center', size: '24', delay: '0.04', width: '700' }
            ],
            [
                { fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },
                { fn: 'Delay', time: '1' }
            ],
            [
                { fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },
            ],
        ];

        expect(scenes).toEqual(expected);
    });

    it('should create scenes from dialogs', () => {
        const dialogs = [
            {
                content: [
                    '[stopmusic]',
                    '[Dialog]',
                    '[Delay(time=1)]',
                    '[Blocker(a=1, r=0, g=0, b=0, fadetime=1, block=true)]',
                    '[Background(image="bg_black",screenadapt="showall")]',
                    '[Delay(time=1)]',
                    '[PlaySound(key="$d_avg_snowstormflp", volume=0.6, loop=true, channel="wind")]',
                    '[Blocker(a=0, r=0, g=0, b=0, fadetime=1, block=true)]',
                    '[Delay(time=0.5)]',
                    '[Subtitle(text="Great Kjeragandr, we walk beside Her.", x=300, y=370, alignment="center", size=24, delay=0.04, width=700)]',
                    '[subtitle]',
                    '[delay(time=1)]',
                    '[Dialog]',
                    '[Blocker(a=0, r=0, g=0, b=0, fadetime=0, block=true)]',
                    '[charslot]',
                    '[Background(image="24_g13_mountpath_s", screenadapt="coverall", block=true)]',
                    '[Delay(time=1)]',
                    '[bgeffect(name="$eb_blizzard",layer=1)]',
                    '[Blocker(a=0, r=0, g=0, b=0, fadetime=2, block=true)]',
                    '[Subtitle(text="Merciful Kjeragandr, we sing praises to Her.", x=300, y=370, alignment="center", size=24, delay=0.04, width=700)]'
                ],
            }
        ];
        const scenes = scenesFromDialogs(dialogs);
        const expected = [
            [ { fn: 'Stopmusic' }, { fn: 'Dialog' }, { fn: 'Delay', time: '1' } ],
            [ { fn: 'Blocker', a: '1', r: '0', g: '0', b: '0', fadetime: '1', block: 'true' }, ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Delay', time: '1' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'PlaySound', key: '$d_avg_snowstormflp', volume: '0.6', loop: 'true', channel: 'wind' },
                { fn: 'Blocker', a: '0', r: '0', g: '0', b: '0', fadetime: '1', block: 'true' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Delay', time: '0.5' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Subtitle', text: 'Great Kjeragandr, we walk beside Her.', x: '300', y: '370', alignment: 'center', size: '24', delay: '0.04', width: '700' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Subtitle' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Delay', time: '1' }
            ],
            [
                { fn: 'Background', image: 'bg_black', screenadapt: 'showall' },
                { fn: 'Dialog' },
                { fn: 'Blocker', a: '0', r: '0', g: '0', b: '0', fadetime: '0', block: 'true' }
            ],
            [
                { fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },
                { fn: 'Charslot' },
                { fn: 'Delay', time: '1' }
            ],
            [
                { fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },
                { fn: 'Bgeffect', name: '$eb_blizzard', layer: '1' },
                { fn: 'Blocker', a: '0', r: '0', g: '0', b: '0', fadetime: '2', block: 'true' }
            ],
            [
                { fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },
                {
                    fn: 'Subtitle', text: 'Merciful Kjeragandr, we sing praises to Her.',
                    x: '300', y: '370', alignment: 'center', size: '24', delay: '0.04', width: '700'
                }
            ],
            [{ fn: 'Background', image: '24_g13_mountpath_s', screenadapt: 'coverall', block: 'true' },]
        ];

        expect(scenes).toEqual(expected);
    });
});
