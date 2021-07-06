const initCustomSelect = (el) => {

    const $selectNative = el.querySelector('.select-native');
    const $selectCustom = el.querySelector('.select-custom');
    const $selectCustomTrigger = $selectCustom.querySelector('.select-custom__trigger');
    const $selectCustomOptions = $selectCustom.querySelector('.select-custom__options');

    let optionSelected = '';

    const watchClickOutside = (e) => {
        const didClickedOutside = !$selectCustom.contains(event.target);
        if (didClickedOutside) {
            closeSelectCustom();
        }
    }

    const supportKeyboardNavigation = (e) => {
        if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
            let index = optionHoveredIndex;
            e.preventDefault(); // prevent page scrolling
            updateCustomSelectHovered(optionHoveredIndex + 1);
        }

        // press up -> go previous
        if (event.keyCode === 38 && optionHoveredIndex > 0) {
            e.preventDefault(); // prevent page scrolling
            updateCustomSelectHovered(optionHoveredIndex - 1);
        }

        // press Enter or space -> select the option
        if (event.keyCode === 13 || event.keyCode === 32) {
            e.preventDefault();

            const option = elSelectCustomOpts.children[optionHoveredIndex];
            const value = option && option.getAttribute("data-value");

            if (value) {
                elSelectNative.value = value;
                updateCustomSelectChecked(value, option.textContent);
            }
            closeSelectCustom();
        }

        // press ESC -> close selectCustom
        if (event.keyCode === 27) {
            closeSelectCustom();
        }
    }

    const openSelectCustom = () => {
        $selectCustom.classList.add('select-custom--active');
        $selectCustom.setAttribute('aria-hidden', false);

        if (optionSelected) {

        }

        document.addEventListener("click", watchClickOutside);
        document.addEventListener("keydown", supportKeyboardNavigation);
    }

    const closeSelectCustom = () => {
        $selectCustom.classList.remove('select-custom--active');
        $selectCustom.setAttribute('aria-hidden', true);

        document.removeEventListener("click", watchClickOutside);
        document.removeEventListener("keydown", supportKeyboardNavigation);
    }

    const updateCustomSelectChecked = (value, text) => {
        const prevValue = optionChecked;

        const $prevOption = $selectCustomOptions.querySelector(
            `[data-value="${prevValue}"`
        );
        const $option = $selectCustomOptions.querySelector(`[data-value="${value}"`);

        if ($prevOption) {
            $prevOption.classList.remove('select-custom__option--active');
        }

        if ($option) {
            $option.classList.add('select-custom__option--active');
        }

        $selectCustomTrigger.textContent = text;
        optionChecked = value;
    }

    $selectCustomTrigger.addEventListener('click', (e) => {
        const isSelectClosed = !$selectCustom.classList.contains('select-custom--active');

        if (isSelectClosed) {
            openSelectCustom();
        } else {
            closeSelectCustom();
        }
    });

    $selectNative.addEventListener('change', (e) => {
        const value = e.target.value;
        const $respectiveCustomOption = $selectCustomOpions.querySelectorAll(
            `[data-value="${value}"]`
        )[0];

        updateCustomSelectChecked(value, $respectiveCustomOption.textContent);
    });

/*    $selectCustomOptions.children.forEach(function($option, index) {
        $option.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            // Sync native select to have the same value
            $selectNative.value = value;
            updateCustomSelectChecked(value, e.target.textContent);
            closeSelectCustom();
        });

        $option.addEventListener('mouseenter', (e) => {
            updateCustomSelectHovered(index);
        });

    });*/
}

const selectTask = document.getElementById('selectTask');
const selectDeadline = document.getElementById('selectDeadline');

initCustomSelect(selectTask);
initCustomSelect(selectDeadline);
