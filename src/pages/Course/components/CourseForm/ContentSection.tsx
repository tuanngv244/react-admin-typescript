import Input from '@/components/Input';
import { ListVerticalStyled } from '@/pages/Course/components/CourseForm/styled';
import { TCreateUpdateUseFormReturn } from '@/types/course';
import { Box, Divider, Grid, IconButton, Tooltip } from '@mui/material';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ContentSectionProps = {
    form: TCreateUpdateUseFormReturn;
};

const ContentSection: React.FC<ContentSectionProps> = ({ form }) => {
    const { t } = useTranslation();
    const { watch, register } = form;

    const _onAddContentItem = () => {
        form.setValue('content', [
            ...(form.watch('content') || []),
            {
                title: '',
                description: '',
            },
        ]);
    };
    const _onRemoveContentItem = (index: number) => {
        form.setValue(
            'content',
            (form.watch('content') || [])?.filter((_, idx) => idx !== index),
        );
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <h3>{t('COURSE.content')}</h3>
                <Box sx={{ cursor: 'pointer' }} component={'div'} onClick={_onAddContentItem}>
                    <IconPlus />
                </Box>
            </Box>
            <Divider sx={{ marginBottom: '-10px' }} />
            <ListVerticalStyled>
                {watch('content')?.map((_, index) => (
                    <Grid container spacing={2} key={index}>
                        <Grid item xs={5}>
                            <Input
                                fullWidth
                                label={t('COURSE.title')}
                                inputProps={{ ...register(`content.${index}.title`) }}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Box width="100%" display="flex" alignItems="flex-end" gap="4px">
                                <Box width="100%">
                                    <Input
                                        fullWidth
                                        label={t('COURSE.description')}
                                        inputProps={{ ...register(`content.${index}.description`) }}
                                    />
                                </Box>
                                <Tooltip title="Delete" sx={{ width: '44px', height: '44px' }}>
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        onClick={() => _onRemoveContentItem(index)}
                                    >
                                        <IconTrash width={22} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </ListVerticalStyled>
        </>
    );
};

export default ContentSection;
