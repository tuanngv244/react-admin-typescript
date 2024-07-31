import Input from '@/components/Input';
import { ListVerticalStyled } from '@/pages/Course/components/CourseForm/styled';
import { TCreateUpdateUseFormReturn } from '@/types/course';
import { Box, Divider, IconButton, Tooltip } from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type RequiredSectionProps = {
    form: TCreateUpdateUseFormReturn;
};

const RequiredSection: React.FC<RequiredSectionProps> = ({ form }) => {
    const { t } = useTranslation();

    const { watch, register } = form;

    const _onAddRequiredItem = () => {
        form.setValue('required', [...(form.watch('required') || []), '']);
    };
    const _onRemoveRequiredItem = (index: number) => {
        form.setValue(
            'required',
            (form.watch('required') || [])?.filter((_, idx) => idx !== index),
        );
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <h3>{t('COURSE.required')}</h3>
                <Box sx={{ cursor: 'pointer' }} component={'div'} onClick={_onAddRequiredItem}>
                    <IconPlus />
                </Box>
            </Box>
            <Divider sx={{ marginBottom: '20px' }} />
            <ListVerticalStyled>
                {watch('required')?.map((_, index) => (
                    <Box width="100%" display="flex" alignItems="flex-center" gap="4px" key={index}>
                        <Box width="100%">
                            <Input inputProps={{ ...register(`required.${index}`) }} fullWidth />
                        </Box>

                        <Tooltip title="Delete" sx={{ width: '44px', height: '44px' }}>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => _onRemoveRequiredItem(index)}
                            >
                                <IconTrash width={22} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </ListVerticalStyled>
        </Box>
    );
};

export default RequiredSection;
