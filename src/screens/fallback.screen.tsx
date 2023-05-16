import { BaseLayout } from '../features/shared-ui/layout/base-layout';
import { BaseView } from '../features/shared-ui/layout/base-view';
import { Spinner } from '../features/shared-ui/spinner/spinner';

export const FallbackScreen = () => {
    return <BaseLayout>
        <BaseView className={'display-flex justify-content-center'}>
            <Spinner/>
        </BaseView>
    </BaseLayout>;
};
