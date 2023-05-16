import { Scoreboard } from '../features/scoreboard/scoreboard';
import { BaseLayout } from '../features/shared-ui/layout/base-layout';

export const ScoreboardScreen = () => {
    return <BaseLayout>
        <Scoreboard/>
    </BaseLayout>;
};
