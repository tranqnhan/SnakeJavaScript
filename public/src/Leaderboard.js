import WorldInfo from './WorldInfo.js';

class Leaderboard extends Phaser.Scene {
    constructor() {
        super({ key: 'leaderboard' });
        this.highscoresDatabase = firebase.firestore().collection('highscores');
    }
    
    init(data) {
        this.playerName = data.name;
        this.playerScore = data.score;
    }

    create() {
        const styles = this.setUpBoard();

        this.highscoresDatabase.get().then((snapshot) => {
            const result = this.compareHighscore(snapshot.docs);
            if (result != null) {
                result.then(() => {
                    this.displayHighscores(styles);
                }) 
            } else {
                this.displayHighscores(styles);
            }
        }).catch((error) => {
            console.error("Something went wrong while trying to get highscores: ", error);
        });
    }

    compareHighscore(docs) {
        if (docs.length < 10) {
            return this.submitHighscore();
        } else {
            for (var i = 0; i < docs.length; i++) {
                const doc = docs[i];
                const data = doc.data();
                if (data.score < this.playerScore) {
                    this.highscoresDatabase.doc(doc.id).delete().catch((error) => {
                        console.error("Something went wrong when deleting old highscore: ", error);
                    })
                    return this.submitHighscore();
                }
            }
        }
        return null;
    }
    submitHighscore() {
        return this.highscoresDatabase.add({
            name: this.playerName,
            score: this.playerScore
        }).catch((error) => {
            console.error("Something went wrong while trying to add new highscore: ", error);
        })
    }

    setUpBoard() {
        //Setting up cosmetics
        //Setting up title
        const leaderboardTitle = this.add.text(0, 0, 'Leaderboard', { fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', fontSize: '32px' });
        leaderboardTitle.setPosition((WorldInfo.width / 2) - (leaderboardTitle.width / 2), 20);
        leaderboardTitle.setShadow(0, 4, 'rgba(0,0,0,0.5)', 0);
        leaderboardTitle.setDepth(1);

        //Setting up rectangles
        this.add.rectangle(WorldInfo.width / 2, leaderboardTitle.height / 2 + 20, WorldInfo.width, leaderboardTitle.height + 40, 0x3BB143);
        this.add.rectangle(WorldInfo.width / 2, WorldInfo.height / 2, WorldInfo.width, WorldInfo.height, 0xd62424).setDepth(-1);

        //Setting up subtitles
        const subtitleFont = { color: '#0D98BA', fontFamily: 'Montserrat, sans-serif', fontSize: '24px' };
        const relativeOriginY = leaderboardTitle.height + 40;
        const padding = 15;
        const rankSubTitle = this.add.text(padding, relativeOriginY + padding, 'Rank', subtitleFont);
        const nameSubTitle = this.add.text(0, 0, 'Name', subtitleFont);
        nameSubTitle.setPosition((WorldInfo.width / 2) - (nameSubTitle.width / 2), relativeOriginY + padding);
        const lengthSubTitle = this.add.text(0, 0, 'Length', subtitleFont);
        lengthSubTitle.setPosition(WorldInfo.width - lengthSubTitle.width - padding, relativeOriginY + padding);

        //Displaying highscores styles
        const highscoreFont = { fontFamily: 'Montserrat, sans-serif', fontSize: '16px' };

        const rankCenterX = padding + rankSubTitle.width / 2;
        const rankCenterY = padding + relativeOriginY + rankSubTitle.height;

        const nameCenterX = nameSubTitle.x + nameSubTitle.width / 2;
        const nameCenterY = padding + relativeOriginY + nameSubTitle.height;

        const lengthCenterX = lengthSubTitle.x + lengthSubTitle.width / 2;
        const lengthCenterY = padding + relativeOriginY + lengthSubTitle.height;

        return { padding, highscoreFont, rankCenterX, rankCenterY, nameCenterX, nameCenterY, lengthCenterX, lengthCenterY };
    }

    displayHighscores(styles) {
        const { padding, highscoreFont, rankCenterX, rankCenterY, nameCenterX, nameCenterY, lengthCenterX, lengthCenterY } = styles;

        //Getting highscores and sort
        const highscores = [];
        this.highscoresDatabase.get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                highscores.push(doc.data());
            });
        }).then(() => {
            highscores.sort((a, b) => {
                return b.score - a.score;
            });
            for (var i = 0; i < 10; i++) {
                var rankNumber = this.add.text(0, 0, i + 1, highscoreFont);
                rankNumber.setPosition(rankCenterX - rankNumber.width / 2, padding * (i + 1) + rankCenterY + rankNumber.height * i);

                var nameText = this.add.text(0, 0, highscores[i].name, highscoreFont);
                nameText.setPosition(nameCenterX - nameText.width / 2, padding * (i + 1) + nameCenterY + nameText.height * i);

                var lengthNumber = this.add.text(0, 0, highscores[i].score, highscoreFont);
                lengthNumber.setPosition(lengthCenterX - lengthNumber.width / 2, padding * (i + 1) + lengthCenterY + lengthNumber.height * i);
            }
        }).catch((error) => console.error("Something went wrong while trying to display highscore: ", error));
    }
}

export default new Leaderboard();