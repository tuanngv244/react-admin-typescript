import Input from '@/components/Input';
import { TCreateUpdateUseFormReturn } from '@/types/course';
import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ScheduleSectionProps = {
    form: TCreateUpdateUseFormReturn;
};

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ form }) => {
    const { t } = useTranslation();
    const {
        register,
        formState: { errors },
    } = form;
    return (
        <Box sx={{ marginBottom: '20px' }}>
            <h3>{t('COURSE.schedule')}</h3>
            <Divider />

            <Input
                fullWidth
                label={t('COURSE.startDate')}
                errorMessage={errors?.schedule?.startDate?.message}
                inputProps={{
                    ...register('schedule.startDate', {
                        required: t('MESSAGE_ERROR.pleaseEnterStartDate'),
                    }),
                }}
            />
            <Input
                fullWidth
                label={t('COURSE.days')}
                errorMessage={errors?.schedule?.days?.message}
                inputProps={{
                    ...register('schedule.days', {
                        required: t('MESSAGE_ERROR.pleaseEnterDays'),
                    }),
                }}
            />
            <Input
                fullWidth
                label={t('COURSE.time')}
                errorMessage={errors?.schedule?.time?.message}
                inputProps={{
                    ...register('schedule.time', {
                        required: t('MESSAGE_ERROR.pleaseEnterTime'),
                    }),
                }}
            />

            <Input
                fullWidth
                label={t('COURSE.address')}
                errorMessage={errors?.schedule?.address?.message}
                inputProps={{
                    ...register('schedule.address', {
                        required: t('MESSAGE_ERROR.pleaseEnterAddress'),
                    }),
                }}
            />
        </Box>
    );
};

export default ScheduleSection;
