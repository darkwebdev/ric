import { Subtitle } from './Subtitle';

export const Decision = ({ line }) => {
    const { options, values } = line;
    const [firstOption] = options.split(';');

    return <Subtitle line={{ text: firstOption}} />;
}
