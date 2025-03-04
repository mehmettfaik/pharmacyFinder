import React from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from 'react-native-paper';

const SelectBox = ({ items, value, setValue, placeholder, open, setOpen, zIndex, zIndexInverse }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { zIndex: zIndex }]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholder}
        style={[
          styles.dropdown, 
          { 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary,
          }
        ]}
        dropDownContainerStyle={[
          styles.dropDownContainer, 
          { 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.primary,
          }
        ]}
        textStyle={{
          color: theme.colors.text,
          fontSize: 16,
        }}
        labelStyle={{
          color: theme.colors.text,
        }}
        placeholderStyle={{
          color: theme.colors.placeholder,
          fontSize: 16,
        }}
        searchTextInputStyle={{
          color: theme.colors.text,
          borderColor: theme.colors.primary,
        }}
        searchPlaceholder="Search..."
        searchable={true}
        listMode="SCROLLVIEW"
        maxHeight={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 50,
  },
  dropDownContainer: {
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default SelectBox;