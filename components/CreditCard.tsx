import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { InputField } from '@/components/InputField';
import CustomToggle from '@/components/CustomToggle';
import { Image } from 'expo-image';
import { Formik } from 'formik';
import { paymentSchema } from '@/lib/validationSchemas';
import { formatCardNumber, formatExpiry } from '@/utils/paymentUtils';
import Toast from 'react-native-toast-message';

interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault: boolean;
}

interface CreditCardProps {
  card: Card;
  onSave: (updatedCard: Partial<Card>) => Promise<void>;
  onMakeDefault: () => Promise<void>;
}

const getCardBrandIcon = (cardNumber: string) => {
  const cleanedNumber = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cleanedNumber)) {
    return require('@/assets/icons/visa.svg');
  } else if (/^5[1-5]/.test(cleanedNumber)) {
    return require('@/assets/icons/mastercard.svg');
  } else if (/^3[47]/.test(cleanedNumber)) {
    return require('@/assets/icons/paypal.svg');
  } else {
    return require('@/assets/icons/my-address/credit-card.svg');
  }
};

const CreditCard: React.FC<CreditCardProps> = ({
  card,
  onSave,
  onMakeDefault,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const formatDisplayCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length <= 4) return cleaned;
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <View className="bg-white gap-5 p-6 rounded-lg shadow-sm">
      {card.isDefault && (
        <View className="absolute top-0 left-0 px-2 z-10 py-[2px] rounded-sm bg-[#EBFFD7]">
          <Text className="text-xs font-poppinsMedium text-primary">
            DEFAULT
          </Text>
        </View>
      )}

      <Pressable
        onPress={toggleExpand}
        accessibilityLabel={isExpanded ? 'Collapse form' : 'Expand form'}
        className="flex flex-row gap-5 items-center justify-between"
      >
        <View className="flex-[0.2] items-center">
          <View className="w-14 h-14 bg-offWhite rounded-full flex items-center justify-center">
            <Image
              source={getCardBrandIcon(card.cardNumber)}
              style={{ width: 32, height: 18 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="flex-[0.75] px-4 space-y-2">
          <Text className="font-poppinsBold text-[16px]">{card.name}</Text>
          <Text className="font-poppinsRegular text-[12px] text-gray">
            {formatDisplayCardNumber(card.cardNumber)}
          </Text>
          <Text className="font-poppinsBold text-[12px]">
            Expires {card.expiry}
          </Text>
        </View>

        <View className="flex-[0.05] items-center">
          <Image
            source={require('@/assets/icons/my-address/collapse.svg')}
            style={{
              width: 18,
              height: 18,
              transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
            }}
            contentFit="contain"
          />
        </View>
      </Pressable>

      {isExpanded && (
        <Formik
          initialValues={{
            name: card.name,
            cardNumber: formatCardNumber(card.cardNumber),
            expiry: card.expiry,
            cvv: card.cvv,
          }}
          validationSchema={paymentSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              await onSave({
                ...values,
                cardNumber: values.cardNumber.replace(/\s/g, ''),
                isDefault: card.isDefault,
              });
              setIsExpanded(false);
            } catch (err) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to update card. Please try again.',
              });
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              <View className="h-[1px] w-full bg-[#EBEBEB]" />

              <View className="flex flex-col gap-2">
                <InputField
                  iconSource={require('@/assets/icons/my-address/user.svg')}
                  placeholder="Name on Card"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  accessibilityLabel="Cardholder name"
                  backgroundColor="bg-offWhite"
                  autoCapitalize="words"
                />
                {touched.name && errors.name && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.name}
                  </Text>
                )}
                <InputField
                  iconSource={getCardBrandIcon(values.cardNumber)}
                  placeholder="Card Number"
                  value={values.cardNumber}
                  onChangeText={(text) => {
                    const digits = text.replace(/\D/g, '').slice(0, 16);
                    const formatted = formatCardNumber(digits);
                    setFieldValue('cardNumber', formatted);
                  }}
                  keyboardType="numeric"
                  maxLength={19}
                  accessibilityLabel="Card number"
                  backgroundColor="bg-offWhite"
                />
                {touched.cardNumber && errors.cardNumber && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.cardNumber}
                  </Text>
                )}
                <View className="flex flex-row gap-2 items-center">
                  <View className="flex-[0.5]">
                    <InputField
                      iconSource={require('@/assets/icons/my-address/calendar.svg')}
                      placeholder="MM/YY"
                      value={values.expiry}
                      onChangeText={(text) => {
                        const digits = text.replace(/\D/g, '').slice(0, 4);
                        const formatted = formatExpiry(digits);
                        setFieldValue('expiry', formatted);
                      }}
                      keyboardType="numeric"
                      maxLength={5}
                      accessibilityLabel="Expiry date"
                      backgroundColor="bg-offWhite"
                    />
                    {touched.expiry && errors.expiry && (
                      <Text className="text-destructive text-[12px] font-poppinsRegular">
                        {errors.expiry}
                      </Text>
                    )}
                  </View>
                  <View className="flex-[0.5]">
                    <InputField
                      iconSource={require('@/assets/icons/lock.svg')}
                      placeholder="CVV"
                      value={values.cvv}
                      onChangeText={(text) => {
                        const digits = text.replace(/\D/g, '').slice(0, 4);
                        setFieldValue('cvv', digits);
                      }}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                      accessibilityLabel="CVV"
                      backgroundColor="bg-offWhite"
                    />
                    {touched.cvv && errors.cvv && (
                      <Text className="text-destructive text-[12px] font-poppinsRegular">
                        {errors.cvv}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <View className="flex flex-row gap-2 items-center">
                <CustomToggle
                  onValueChange={onMakeDefault}
                  value={card.isDefault || false}
                />
                <Text className="font-poppinsMedium text-[12px]">
                  Make default
                </Text>
              </View>

              <Pressable
                onPress={() => handleSubmit()}
                className={`bg-primary p-2 rounded-lg mt-2 ${
                  isLoading ? 'opacity-50' : ''
                }`}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-poppinsMedium">
                  {isLoading ? 'Saving...' : 'Save'}
                </Text>
              </Pressable>
            </>
          )}
        </Formik>
      )}
    </View>
  );
};

export default CreditCard;
