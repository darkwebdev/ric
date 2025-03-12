import { Rarities } from '../../const.js';

export const Rarity = ({ rarity }) => {
    const rarityIndex = Rarities.indexOf(rarity);
    return <span className="rarity">
        {Rarities.map((rarityName, i) => rarityIndex >= i ? '★️' : '').join('')}
    </span>
}
