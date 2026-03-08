from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "John Doe"}),
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"class": "form-control", "placeholder": "john@example.com"}),
    )
    department = forms.ChoiceField(
        choices=[("", "Select department..."), ("eng", "Engineering"), ("design", "Design"), ("sales", "Sales"), ("support", "Support")],
        widget=forms.Select(attrs={"class": "form-select"}),
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={"class": "form-control", "rows": 3, "placeholder": "Your message..."}),
    )
    priority = forms.ChoiceField(
        choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")],
        widget=forms.RadioSelect(attrs={"class": "form-check-input"}),
        initial="medium",
    )
    subscribe = forms.BooleanField(
        required=False,
        initial=True,
        label="Subscribe to updates",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"}),
    )
    notifications = forms.BooleanField(
        required=False,
        label="Enable notifications",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input", "role": "switch"}),
    )


class SearchForm(forms.Form):
    query = forms.CharField(
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Search..."}),
    )
    category = forms.ChoiceField(
        choices=[("all", "All"), ("users", "Users"), ("posts", "Posts"), ("files", "Files")],
        widget=forms.Select(attrs={"class": "form-select"}),
    )
    active_only = forms.BooleanField(
        required=False,
        label="Active only",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"}),
    )


class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(attrs={"class": "form-control", "placeholder": "Username"}),
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control", "placeholder": "Password"}),
    )
    remember_me = forms.BooleanField(
        required=False,
        label="Remember me",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"}),
    )


class ValidationDemoForm(forms.Form):
    """Pre-populated form to demonstrate validation states."""
    valid_field = forms.CharField(
        label="Valid field",
        widget=forms.TextInput(attrs={"class": "form-control is-valid", "value": "Looks good!"}),
    )
    invalid_field = forms.CharField(
        label="Invalid field",
        widget=forms.TextInput(attrs={"class": "form-control is-invalid", "value": ""}),
        help_text="This field is required.",
    )
    valid_select = forms.ChoiceField(
        label="Valid select",
        choices=[("opt1", "Option 1"), ("opt2", "Option 2")],
        widget=forms.Select(attrs={"class": "form-select is-valid"}),
    )
