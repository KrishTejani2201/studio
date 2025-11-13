import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Settings</CardTitle>
                <CardDescription>Manage your account and application settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is a placeholder for the settings page.</p>
            </CardContent>
        </Card>
    )
}
