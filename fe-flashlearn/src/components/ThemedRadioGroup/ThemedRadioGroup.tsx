import { COLOR_CODE } from '@appConfig';
import Element from '@components/Element';
import { Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { handleScrollToElement } from '@utils';
import { forwardRef } from 'react';
import { ThemedRadioGroupProps } from './ThemedRadioGroup.types';

const ThemedRadioGroup = forwardRef<HTMLDivElement, ThemedRadioGroupProps>(
  (
    {
      label,
      options,
      onChange,
      onBlur,
      value,
      columns = 1,
      name,
      errorMessage,
      containerClassName,
      ElementProps = {},
      scrollToElementIdOnChange = null,
      preventFocusOnScroll = false,
      variant = 'default',
      color = 'default',
      spacing = 1,
      ...props
    },
    ref,
  ) => {
    const { ...restElementProps } = ElementProps;

    const scrollToElement = () => {
      if (scrollToElementIdOnChange) {
        handleScrollToElement(scrollToElementIdOnChange, preventFocusOnScroll);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (options.find((option) => option?.shortcutKey === e.key)) {
        const selectedOption = options.find((option) => option?.shortcutKey === e.key);
        onChange(name, selectedOption?.value);
        scrollToElement();
      }
    };

    const handleBlur = () => {
      onBlur && onBlur(name, value);
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      const { value } = target;
      onChange(name, value);
      scrollToElement();
    };

    const backgroundColor =
      color === 'default'
        ? COLOR_CODE.PRIMARY_100
        : color === 'danger'
        ? COLOR_CODE.DANGER_BG
        : COLOR_CODE.SUCCESS_BG;

    const borderColor =
      color === 'default'
        ? COLOR_CODE.PRIMARY
        : color === 'danger'
        ? COLOR_CODE.DANGER
        : COLOR_CODE.SUCCESS;

    const shadowColor =
      color === 'default'
        ? COLOR_CODE.PRIMARY_400
        : color === 'danger'
        ? COLOR_CODE.DANGER
        : COLOR_CODE.SUCCESS;

    return (
      <div ref={ref}>
        <Element
          errorMessage={errorMessage}
          label={label}
          className={containerClassName}
          {...restElementProps}
        >
          <RadioGroup
            name={name}
            onKeyDown={handleKeyDown}
            onChange={handleValueChange}
            onBlur={handleBlur}
            {...props}
          >
            <Grid
              container
              spacing={spacing}
              margin={variant === 'square' ? 'auto' : 'default'}
              maxWidth={variant === 'square' ? 'sm' : '100%'}
            >
              {options.map(({ label, value: optionValue, shortcutKey, disabled }) => {
                const active = value === optionValue;
                return (
                  <Grid item xs={12 / columns} key={optionValue}>
                    <Stack
                      component="label"
                      direction="row"
                      sx={{
                        p: 2,
                        backgroundColor: active ? backgroundColor : 'white',
                        border: `3px solid ${active ? borderColor : COLOR_CODE.GREY_200}`,
                        borderRadius: 3,
                        cursor: 'pointer',
                        alignItems: 'center',
                        boxShadow: `4px 4px 0px ${active ? shadowColor : COLOR_CODE.GREY_200}`,
                        ':hover': {
                          backgroundColor: active ? COLOR_CODE.PRIMARY_200 : COLOR_CODE.GREY_50,
                          boxShadow: `4px 4px 0px ${
                            active ? COLOR_CODE.PRIMARY_400 : COLOR_CODE.GREY_200
                          }`,
                        },
                        ':active': {
                          backgroundColor: active ? COLOR_CODE.PRIMARY_300 : COLOR_CODE.GREY_100,
                          marginTop: '4px',
                          boxShadow: 'none',
                          marginBottom: '0px',
                        },
                        ...(variant === 'square' && {
                          position: 'relative',
                          justifyContent: 'center',
                          margin: 'auto',
                          ':after': {
                            content: "''",
                            display: 'block',
                            paddingBottom: '50%',
                          },
                        }),
                      }}
                    >
                      <Radio
                        checked={value === optionValue}
                        disabled={disabled}
                        onChange={handleValueChange}
                        value={optionValue}
                        name={name}
                        sx={{
                          ...(variant === 'square' && {
                            position: 'absolute',
                            top: 8,
                            left: 8,
                          }),
                          '&.Mui-checked': {
                            color: active && borderColor,
                          },
                        }}
                      />
                      <Stack direction="row" alignItems="center" gap={2} px={1}>
                        {shortcutKey && (
                          <Typography
                            sx={{
                              borderRadius: '4px',
                              border: `1px solid ${COLOR_CODE.GREY_200}`,
                              padding: '0 4px',
                              lineHeight: '20px',
                              backgroundColor: 'white',
                              ...(variant === 'square' && {
                                position: 'absolute',
                                bottom: '4px',
                                left: '4px',
                              }),
                            }}
                          >
                            {shortcutKey}
                          </Typography>
                        )}
                        <Typography fontSize={20} fontWeight={600}>
                          {label}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>
        </Element>
      </div>
    );
  },
);

export default ThemedRadioGroup;
