import { Questionnaire } from '../features/questionnaire/questionnaire';
import { BaseLayout } from '../features/shared-ui/layout/base-layout';

export const QuestionnaireScreen = () => {
    return <BaseLayout>
        <Questionnaire/>
    </BaseLayout>;
};
