export const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomCode = () => {

    const randomCode = Array(4).fill(undefined).map(_ => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    });

    return randomCode.join('');
}

const images = {
    'true-false': '/Red.png',
    'true-true': '/RedKing.png',
    'false-false': '/Black.png',
    'false-true': '/BlackKing.png',
};

export const getImageFromInfo = (isFirstPlayer: boolean, isKing: boolean): string => {
    return images[`${isFirstPlayer}-${isKing}`];
};
