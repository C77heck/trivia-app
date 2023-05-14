import { Scoreboard } from '../features/scoreboard/scoreboard';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const ScoreboardScreen = ({ route }: ScreenProps) => {
    return <ScreenRoute route={route}>
        <Scoreboard/>
    </ScreenRoute>;
};
