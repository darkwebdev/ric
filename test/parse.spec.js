import fs from 'fs';
import path from 'path';
import { dialogsFromText, objectFromKvString, parseContent, parseDialog } from '../src/parse.js';

describe('Parsing story dialogs', () => {
    describe('dialogsFromText()', () => {
        it('should create dialogs from text', () => {
            const text = loadTextFile('./mocks/story-text.txt');
            const dialogs = dialogsFromText(text);

            expect(dialogs.slice(0, 3)).toEqual([
                {
                    fadetime: '0',
                    foo: '"bar"',
                    content: [
                        '[PlayMusic(intro="$darkness01_intro", key="$darkness01_loop", volume=0.6, crossfade=1.5)]',
                        '[Delay(time=1)]',
                    ],
                },
                {
                    content: [
                        '[name="???"]   ......'
                    ],
                },
                {
                    content: [
                        '[Delay(time=1)]',
                        '[Blocker(a=1, r=0,g=0, b=0, fadetime=0.6, block=true)]',
                        '[Character(fadetime=0)]',
                        '[Image(image="ac1_0",x=0, y=0, xScale=1, yScale=1, fadetime=0, screenadapt="cvoerall")]',
                        '[Blocker(a=0, fadetime=0.6, block=false)]',
                        '[ImageTween(xFrom=0, yFrom=0, xTo=0, yTo=-20, xScaleFrom=1, yScaleFrom=1, xScaleTo=1.1, yScaleTo=1.1, duration=15, block=false)]',
                        '[name="???"]   (...It burns...)',
                        '[name="???"]   (...It hurts...)',
                    ]
                }
            ]);
        });
    });

    describe('parseDialog()', () => {
        it('should parse dialog lines', () => {
            const lines = [
                '[UnknownCommand]',
                '[UnknownCommand()]',
                '[UnknownCommand(foo="bar")]',
                '[name="???"]   ......',
                '[Character(fadetime=0)]',
                '[Blocker(a=1, r=0,g=0, b=0, fadetime=1.6, block=true)]',
                '[Image(image="ac1_0",x=0, y=0, xScale=1, yScale=1, fadetime=0, screenadapt="cvoerall")]',
                '[name="bla"]   (...It sucks...)',
                '[Delay(time=1)]',
                '[ImageTween(xFrom=0, yFrom=0, xTo=0, yTo=-20, xScaleFrom=1, yScaleFrom=1, xScaleTo=1.1, yScaleTo=1.1, duration=15, block=false)]',
                '[name="Bounty Hunter"]   So, the wench still won\'t speak up?',
                'There is no end to war. And there is no end to our fight.',
                'It is as if war is the tool that we have always relied on for survival.',
                '[charslot(slot="m",name="avg_npc_1490_1#1$1")]',
            ];
            const expected = [
                { fn: 'UnknownCommand' },
                { fn: 'UnknownCommand' },
                { fn: 'UnknownCommand', foo: 'bar' },
                { fn: 'Text', name: '???', text: '......' },
                { fn: 'Character', fadetime: '0' },
                { fn: 'Blocker', a: '1', r: '0', g: '0', b: '0', fadetime: '1.6', block: 'true' },
                { fn: 'Image', image: 'ac1_0', x: '0', y: '0', xScale: '1', yScale: '1', fadetime: '0', screenadapt: 'cvoerall' },
                { fn: 'Text', name: 'bla', text: '(...It sucks...)' },
                { fn: 'Delay', time: '1' },
                { fn: 'ImageTween', block: 'false', duration: '15', xFrom: '0', xScaleFrom: '1', xScaleTo: '1.1', xTo: '0', yFrom: '0', yScaleFrom: '1', yScaleTo: '1.1', yTo: '-20' },
                { fn: 'Text', name: 'Bounty Hunter', text: 'So, the wench still won\'t speak up?' },
                { fn: 'Text', text: 'There is no end to war. And there is no end to our fight.' },
                { fn: 'Text', text: 'It is as if war is the tool that we have always relied on for survival.' },
                { fn: 'charslot', name: 'avg_npc_1490_1#1$1', slot: 'm' },
            ];
            expect(parseDialog(lines)).toEqual(expected);
        });
    });

    describe('parseContent()', () => {
        it('should transform colors', () => {
            const content = 'This is a <color=#ff0000>red</color> text.';
            const expected = 'This is a <span style="color:#ff0000">red</span> text.';

            expect(parseContent(content)).toEqual(expected);
        });
    });

    describe('objectFromKvString()', () => {
        it('should parse key-value strings', () => {
            const line = 'a=1, b1="foo", c=false, d=true, e=0.1';
            const expected = { a: '1', b1: 'foo', c: 'false', d: 'true', e: '0.1' };
            expect(objectFromKvString(line)).toEqual(expected);
        });
    });
});

function loadTextFile(name) {
    const filePath = path.join(__dirname, name);
    return fs.readFileSync(filePath, 'utf8');
}
