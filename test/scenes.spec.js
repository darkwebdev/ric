import { scenesFromDialogs } from '../src/scenes.js';

describe('scenes', () => {
    describe('scenesFromDialogs()', () => {
        it('should build scenes from dialogs', () => {
            const dialogs = [
                {
                    content:
                        [{ fn: 'Command1' }, { fn: 'Text', text: 'Hello' }],
                },
                {
                    content:
                        [{ fn: 'Command1' }, { fn: 'Text', text: 'World' }, { fn: 'Command2' }],
                }
            ];
            const expected = [
                [{ fn: 'Command1' }, { fn: 'Text', text: 'Hello' }],
                [{ fn: 'Command1' }, { fn: 'Text', text: 'World' }],
                [{ fn: 'Command2' }],
            ];
            expect(scenesFromDialogs(dialogs)).toEqual(expected);
        });

        it('should build complex scenes from dialogs', () => {
            const dialogs = [
                {
                    content: [
                        { fn: 'UnknownCommand' },
                        { fn: 'UnknownCommand' },
                        { fn: 'UnknownCommand', foo: 'bar' },
                        { fn: 'Text', name: '???', text: '......' },
                        { fn: 'Character', fadetime: '0' },
                        { fn: 'Blocker', a: '1', r: '0', g: '0', b: '0', fadetime: '1.6', block: 'true' },
                        {
                            fn: 'Image',
                            image: 'ac1_0',
                            x: '0',
                            y: '0',
                            xScale: '1',
                            yScale: '1',
                            fadetime: '0',
                            screenadapt: 'cvoerall'
                        },
                        { fn: 'Text', name: 'bla', text: '(...It sucks...)' },
                        { fn: 'Delay', time: '1' },
                    ],
                },
                {
                    content: [
                        {
                            fn: 'ImageTween',
                            block: 'false',
                            duration: '15',
                            xFrom: '0',
                            xScaleFrom: '1',
                            xScaleTo: '1.1',
                            xTo: '0',
                            yFrom: '0',
                            yScaleFrom: '1',
                            yScaleTo: '1.1',
                            yTo: '-20'
                        },
                        { fn: 'Text', name: 'Bounty Hunter', text: 'So, the wench still won\'t speak up?' },
                        { fn: 'Text', text: 'There is no end to war. And there is no end to our fight.' },
                        { fn: 'Text', text: 'It is as if war is the tool that we have always relied on for survival.' },
                        { fn: 'charslot', name: 'avg_npc_1490_1#1$1', slot: 'm' },
                    ]
                },
            ];
            const expected = [
                [
                    { fn: 'UnknownCommand' },
                    { fn: 'UnknownCommand' },
                    { fn: 'UnknownCommand', foo: 'bar' },
                    { fn: 'Text', name: '???', text: '......' },
                ],
                [
                    { fn: 'Character', fadetime: '0' },
                    { fn: 'Blocker', a: '1', r: '0', g: '0', b: '0', fadetime: '1.6', block: 'true' },
                    { fn: 'Image', image: 'ac1_0', x: '0', y: '0', xScale: '1', yScale: '1', fadetime: '0', screenadapt: 'cvoerall' },
                    { fn: 'Text', name: 'bla', text: '(...It sucks...)' },
                ],
                [
                    { fn: 'Delay', time: '1' },
                    { fn: 'ImageTween', block: 'false', duration: '15', xFrom: '0', xScaleFrom: '1', xScaleTo: '1.1', xTo: '0', yFrom: '0', yScaleFrom: '1', yScaleTo: '1.1', yTo: '-20' },
                    { fn: 'Text', name: 'Bounty Hunter', text: 'So, the wench still won\'t speak up?' },
                ],
                [
                    { fn: 'Text', text: 'There is no end to war. And there is no end to our fight.' },
                ],
                [
                    { fn: 'Text', text: 'It is as if war is the tool that we have always relied on for survival.' },
                ],
                [
                    { fn: 'charslot', name: 'avg_npc_1490_1#1$1', slot: 'm' },
                ],
            ];
            expect(scenesFromDialogs(dialogs)).toEqual(expected);
        });
    });
});
