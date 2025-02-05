export function parseContent(content = '') {
    const color_re = /<color=([\w#]+)>(.+?)<\/color>/gm;
    const color_sub = `<span style="color:$1">$2</span>`;
    // const nbsp_sub_before = /(\s+)(<\/?\w+>)/gm;
    // const nbsp_sub_after = /(<\/?\w+>)(\s+)/gm;

    // content = content.replaceAll("{@nickname}", this.doctor);
    // content = content.replace(/(?:\r\n|\r|\n|\\n|\\r)/g, "<br>");
    content = content.replace(color_re, color_sub);
    // content = content.replace("#000000","white");
    // content = content.replace(nbsp_sub_before, "&nbsp;$2");
    // content = content.replace(nbsp_sub_after, "$1&nbsp;");

    return content;
}

export function dialogsFromText(text) {
    // eslint-disable-next-line no-unused-vars
    const [header, ...dialogs] = text.split(/\[Dialog/);
    // console.log(dialogs);
    return dialogs.map(lines => lines.split('\n').reduce((acc, line) => {
        if (line.startsWith('(')) {
            const matches = [...line.matchAll(/(\w+)=("[^"]*"|\d+)/g)];
            matches.forEach(([_, key, value]) => {
                acc[key] = value;
            });
        } else if (line.length && line !== ']') {
            acc.content = acc.content || [];
            acc.content.push(line);
        }
        return acc;
    }, {}));
}

export function parseDialog(lines) {
    return lines.map(line => {
        if (line.startsWith('[')) {
            const nameMatch = line.match(/\[name="([^"]+)"]\s+(.*)/);
            if (nameMatch) {
                const [_, name, text] = nameMatch;
                return { fn: 'Text', name, text };
            }
            const fnMatch = line.match(/\[(\w+)(.*)/);
            if (fnMatch) {
                const [_, fn, fnArgs] = fnMatch;
                return { fn, ...objectFromKvString(fnArgs) };
            }
            console.log('Unknown command:', line);
        } else {
            return { fn: 'Text', text: line };
        }
    }).filter(Boolean);
}

export function objectFromKvString(line) {
    const matches = [...line.matchAll(/(\w+)=("([^"]*)"|[^,^)]+)/g)];
    return Object.fromEntries(matches.map(([_, key, value]) => [key, value.replace(/^"|"$/g, '')]));

}
