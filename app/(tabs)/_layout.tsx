import {NativeTabs, Icon, Label, Badge} from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name="contacts">
                <Label>Contacts</Label>
                <Icon sf="person.circle.fill" drawable="custom_contacts_drawable" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="calls">
                <Label>Calls</Label>
                <Icon sf="phone.fill" drawable="custom_phone_drawable" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="index">
                <Label>Chats</Label>
                <Badge>3</Badge>
                <Icon sf="message.fill" drawable="custom_message_drawable" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="settings">
                <Label>Settings</Label>
                <Icon sf="gear" drawable="custom_settings_drawable" />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}