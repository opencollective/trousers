import styleCollector from './style-collector';

describe('styleCollector', () => {
    it('returns the correct element name', () => {
        const collector = styleCollector('my-element-name');

        expect(collector.getElementName()).toEqual('my-element-name');
    });

    it('registers an element', () => {
        const collector = styleCollector('myBlock').element`
                font-style: normal;
            `;

        expect(collector.get().length).toBe(1);
        expect(collector.get()[0].hash).toEqual('2111092729');
    });

    it('registers an element and modifier', () => {
        const collector = styleCollector<{ isBold: boolean }>('myBlock')
            .element`
                font-style: normal;
            `.modifier(props => !!props!.isBold)`
                font-style: bold;
            `;

        expect(collector.get().length).toBe(2);
        expect(collector.get()[1].hash).toEqual('2064733655');
        expect(collector.get()[1].predicate({ isBold: true })).toBe(true);
    });

    it('registers an element and named modifier', () => {
        const collector = styleCollector<{ isBold: boolean }>('myBlock')
            .element`
                font-style: normal;
            `.modifier('bold', props => !!props!.isBold)`
                font-style: bold;
            `;

        expect(collector.get().length).toBe(2);
        expect(collector.get()[1].hash).toEqual('bold2064733655');
        expect(collector.get()[1].predicate({ isBold: true })).toBe(true);
    });

    it('registers an element and multiple modifiers', () => {
        interface Props {
            isBold?: boolean;
            isItalic?: boolean;
        }

        const collector = styleCollector<Props>('myBlock').element`
                font-style: normal;
            `.modifier(props => !!props!.isBold)`
                font-style: bold;
            `.modifier(props => !!props!.isItalic)`
                font-style: italic;
            `;

        expect(collector.get().length).toBe(3);
        expect(collector.get()[0].hash).toEqual('2111092729');
        expect(collector.get()[1].hash).toEqual('2064733655');
        expect(collector.get()[2].hash).toEqual('2172502402');
    });
});
