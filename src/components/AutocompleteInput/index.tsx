import * as React from 'react';
import { View, TextInput, ActivityIndicator, Text, Platform } from 'react-native';
import styles from './styles';
import AutoCompleteLine from '../AutocompleteLine';

interface AutocompleteInputProps {
  onChangeText: (text: string) => void;
  onResultPress: (text: string) => void;
  onBlur: () => void;
  value: string;
  placeholder?: string;
  autocomplete: { id: string, text: string }[];
  hideAutocomplete: boolean;
  loading: boolean;
}

export default function (props: AutocompleteInputProps): any {
  const { onChangeText, onBlur, onResultPress, value, placeholder, autocomplete, hideAutocomplete, loading } = props;
  let textInput: any;
  return (
    <View style={(Platform.OS === 'ios')? { zIndex: 2 } : {}}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input => textInput = input}
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
          <ActivityIndicator animating={loading} />
        </View>
        {
          (!hideAutocomplete) && (
            <View style={styles.results}>
              {
                autocomplete.map(e => (
                  <AutoCompleteLine
                    key={e.id}
                    id={e.id}
                    text={e.text}
                    onResultPress={(id: string) => textInput.blur() || onResultPress(id)}
                  />
               ))
              }
            </View>
          )
        }
      </View>
    </View>
  );
}
