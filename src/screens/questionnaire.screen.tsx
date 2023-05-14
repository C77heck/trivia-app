import { Questionnaire } from '../features/questionnaire/questionnaire';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const QuestionnaireScreen = ({ route }: ScreenProps) => {
    return <ScreenRoute route={route}>
        <Questionnaire/>
    </ScreenRoute>;
};
